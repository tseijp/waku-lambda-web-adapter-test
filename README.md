# waku-lambda-web-adapter-test

## Quick start

```
git clone https://github.com/tseijp/waku-lambda-web-adapter-test
cd waku-lambda-web-adapter-test
sam build
sam deploy --guided
```

## Getting started

```ruby
npm create waku@latest
cd my-app
```

### Create 4 file

- Makefile
- run.sh
- startServer.mjs
- template.yml

### Deploy to lambda

before install docker and aws sam

```ruby
sam build
sam local invoke --region ap-northeast-1
sam deploy --guided
```

### Connect to CI/CD

```
echo 'samconfig.toml' >> .gitignore
echo '**/.aws-sam' >> .gitignore
sam pipeline init --bootstrap
git add .
git commit -m ":tada: init commit"
git push
```