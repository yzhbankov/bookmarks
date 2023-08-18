resource "aws_apigatewayv2_api" "bookmarks-api" {
  name          = "bookmarks-api"
  protocol_type = "HTTP"
  body = templatefile("${path.module}/../../apps/api-gateway/api.yaml",
    {
      aws_region           = data.aws_region
      tags_lambda_arn      = aws_lambda_function.tags-lambda.arn
      spaces_lambda_arn    = aws_lambda_function.spaces-lambda.arn
      bookmarks_lambda_arn = aws_lambda_function.bookmarks-lambda.arn
      auth_lambda_arn      = aws_lambda_function.auth-lambda.arn
      domain_url           = ""
    }
  )

  tags = {
    Name = "bookmarks-api-gateway"
  }
}

resource "aws_apigatewayv2_stage" "default" {
  api_id      = aws_apigatewayv2_api.bookmarks-api.id
  name        = "$default"
  auto_deploy = true

  tags = {
    Name = "bookmarks-api-gateway-stage"
  }
}
