variable "aws_region" {
  default = "us-east-1"
}

variable "domain" {
  default = "xurb.game"
}

# Note: Update this to match your Route53 hosted zone ID.
variable "zone_id" {
  default = "Z063333713T22JLV4I7CL"
}

# Note: You need to create this through AWS Certificate Manager first.
variable "acm_certificate_arn" {
  default = "arn:aws:acm:us-east-1:760409023485:certificate/801e92d5-3b86-4e05-bf3d-f2106bad1fe0"
}

provider "aws" {
  region = var.aws_region
}

# Note: The bucket name needs to carry the same name as the domain!
# http://stackoverflow.com/a/5048129/2966951
resource "aws_s3_bucket" "site" {
  bucket = var.domain

  website {
    index_document = "index.html"
  }
}

resource "aws_s3_bucket_website_configuration" "index" {
  bucket = aws_s3_bucket.site.id
  index_document {
    suffix = "index.html"
  }
  error_document {
    key = "index.html"
  }
}

resource "aws_s3_bucket_public_access_block" "allow_public" {
  bucket = aws_s3_bucket.site.id

  block_public_acls   = false
  block_public_policy = false
}

# Seems not to be needed?
resource "aws_s3_bucket_policy" "allow_from_cloudfront" {
  bucket = aws_s3_bucket.site.id
  policy = data.aws_iam_policy_document.allow_from_cloudfront.json
}

data "aws_iam_policy_document" "allow_from_cloudfront" {
  statement {
    effect = "Allow"
    principals {
      type        = "*"
      identifiers = ["*"]
    }
    actions = [
      "s3:GetObject",
    ]
    resources = [
      "${aws_s3_bucket.site.arn}/*",
    ]
  }
}

resource "aws_route53_record" "root_domain" {
  zone_id = var.zone_id
  name    = var.domain
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.cdn.domain_name
    zone_id                = aws_cloudfront_distribution.cdn.hosted_zone_id
    evaluate_target_health = false
  }
}

data "aws_cloudfront_cache_policy" "cache_policy" {
  name = "Managed-CachingOptimized"
}

resource "aws_cloudfront_distribution" "cdn" {
  origin {
    origin_id   = var.domain
    # Specifying website here enables static website features like index.html and error.html.
    domain_name = "${var.domain}.s3-website-us-east-1.amazonaws.com"
    # We need to specify this in order to use the static website above, http-only refers to the
    # internal CloudFront->S3 communication, not the external one.
    custom_origin_config {
      http_port = 80
      https_port = 443
      origin_protocol_policy = "http-only"
      origin_ssl_protocols = ["SSLv3", "TLSv1", "TLSv1.1", "TLSv1.2"]
    }
  }

  # If using route53 aliases for DNS we need to declare it here too, otherwise we'll get 403s.
  aliases = ["${var.domain}"]

  enabled             = true
  default_root_object = "index.html"

  default_cache_behavior {
    cache_policy_id  = data.aws_cloudfront_cache_policy.cache_policy.id
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = var.domain

    viewer_protocol_policy = "allow-all"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  # The cheapest priceclass
  price_class = "PriceClass_100"

  # This is required to be specified even if it's not used.
  restrictions {
    geo_restriction {
      restriction_type = "none"
      locations        = []
    }
  }

  viewer_certificate {
    acm_certificate_arn      = var.acm_certificate_arn
    minimum_protocol_version = "TLSv1.2_2019"
    ssl_support_method       = "sni-only"
  }
}

output "s3_website_endpoint" {
  value = aws_s3_bucket.site.website_endpoint
}

output "route53_domain" {
  value = aws_route53_record.root_domain.fqdn
}

output "cdn_domain" {
  value = aws_cloudfront_distribution.cdn.domain_name
}