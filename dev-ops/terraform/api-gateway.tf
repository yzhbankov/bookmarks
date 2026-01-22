resource "aws_api_gateway_rest_api" "bookmarks-api" {
  name        = "bookmarks-api"
  description = "Bookmarks API Gateway"
  body = templatefile("${path.module}/../../apps/api-gateway/api.yaml",
    {
      aws_region           = var.AWS_REGION
      tags_lambda_arn      = aws_lambda_function.tags-lambda.arn
      spaces_lambda_arn    = aws_lambda_function.spaces-lambda.arn
      bookmarks_lambda_arn = aws_lambda_function.bookmarks-lambda.arn
      auth_lambda_arn      = aws_lambda_function.auth-lambda.arn
      feedback_lambda_arn  = aws_lambda_function.feedback-lambda.arn
      domain_url           = ""
    }
  )

  endpoint_configuration {
    types = ["REGIONAL"]
  }

  tags = {
    Name = "bookmarks-api-gateway"
  }
}

resource "aws_api_gateway_deployment" "deployment" {
  rest_api_id = aws_api_gateway_rest_api.bookmarks-api.id
  stage_name  = "prod"
}

resource "aws_lambda_permission" "api-gateway-invoke-bookmarks-lambda" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.bookmarks-lambda.function_name
  principal     = "apigateway.amazonaws.com"

  # The /*/* portion grants access from any method on any resource
  # within the specified API Gateway.
  source_arn = "${aws_api_gateway_rest_api.bookmarks-api.execution_arn}/*/*"
}

resource "aws_lambda_permission" "api-gateway-invoke-tags-lambda" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.tags-lambda.function_name
  principal     = "apigateway.amazonaws.com"

  # The /*/* portion grants access from any method on any resource
  # within the specified API Gateway.
  source_arn = "${aws_api_gateway_rest_api.bookmarks-api.execution_arn}/*/*"
}

resource "aws_lambda_permission" "api-gateway-invoke-spaces-lambda" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.spaces-lambda.function_name
  principal     = "apigateway.amazonaws.com"

  # The /*/* portion grants access from any method on any resource
  # within the specified API Gateway.
  source_arn = "${aws_api_gateway_rest_api.bookmarks-api.execution_arn}/*/*"
}

resource "aws_lambda_permission" "api-gateway-invoke-auth-lambda" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.auth-lambda.function_name
  principal     = "apigateway.amazonaws.com"

  # The /*/* portion grants access from any method on any resource
  # within the specified API Gateway.
  source_arn = "${aws_api_gateway_rest_api.bookmarks-api.execution_arn}/*/*"
}

resource "aws_lambda_permission" "api-gateway-invoke-feedback-lambda" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.feedback-lambda.function_name
  principal     = "apigateway.amazonaws.com"

  # The /*/* portion grants access from any method on any resource
  # within the specified API Gateway.
  source_arn = "${aws_api_gateway_rest_api.bookmarks-api.execution_arn}/*/*"
}
