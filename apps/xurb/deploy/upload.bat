@echo off

set bucket="xurb.game"

echo -- BEGIN CHANGES --
aws s3 sync ..\build\ s3://%bucket%/ --exclude "*.js" --exclude "*.css" --exclude "*.br" --delete --dryrun
aws s3 sync ..\build\ s3://%bucket%/ --exclude "*" --include "*.js" --delete --content-type application/javascript --dryrun
aws s3 sync ..\build\ s3://%bucket%/ --exclude "*" --include "*.css" --delete --content-type text/css --dryrun
if %errorlevel% neq 0 exit /b %errorlevel%
echo --- END CHANGES ---

set /P AREYOUSURE="Upload (Y/[n])?"
if /I "%AREYOUSURE%" neq "Y" goto CANCEL

aws s3 sync ..\build\ s3://%bucket%/ --exclude "*.js" --exclude "*.css" --exclude "*.br" --delete
aws s3 sync ..\build\ s3://%bucket%/ --exclude "*" --include "*.js" --delete --content-type application/javascript
aws s3 sync ..\build\ s3://%bucket%/ --exclude "*" --include "*.css" --delete --content-type text/css
if %errorlevel% neq 0 exit /b %errorlevel%
aws cloudfront create-invalidation --distribution-id EDSH7SA6MEYNF --paths /*
if %errorlevel% neq 0 exit /b %errorlevel%

exit /b

:CANCEL
echo Upload cancelled
exit /b

exit /b