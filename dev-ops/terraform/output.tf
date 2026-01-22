output "api_gateway_base_url" {
  value = aws_api_gateway_stage.prod.invoke_url
}

output "dynamodb" {
  value = aws_dynamodb_table.bookmarks_table.name
}

output "aws_region" {
  value = var.AWS_REGION
}
