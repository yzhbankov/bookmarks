locals {
  tags-lambda      = "${path.module}/../../apps/lambdas/tags"
  auth-lambda      = "${path.module}/../../apps/lambdas/auth"
  spaces-lambda    = "${path.module}/../../apps/lambdas/spaces"
  bookmarks-lambda = "${path.module}/../../apps/lambdas/bookmarks"
  lambda_timeout   = 60
}

data "aws_iam_policy_document" "assume_role" {
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "iam_for_lambda" {
  name               = "${terraform.workspace}_iam_for_lambda"
  assume_role_policy = data.aws_iam_policy_document.assume_role.json
}

resource "aws_iam_role_policy_attachment" "lambda_dynamodb_role_policy" {
  role       = aws_iam_role.iam_for_lambda.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess"
}

resource "aws_iam_role_policy_attachment" "lambda_basic_execution_role_policy" {
  role       = aws_iam_role.iam_for_lambda.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_role_policy_attachment" "lambda_logs_role_policy" {
  role       = aws_iam_role.iam_for_lambda.name
  policy_arn = "arn:aws:iam::aws:policy/CloudWatchLogsFullAccess"
}

# TAGS LAMBDA
resource "null_resource" "install_tags_dependencies" {
  provisioner "local-exec" {
    command = "cd ${local.tags-lambda} && npm install"
  }

  triggers = {
    always_run = timestamp()
  }
}

data "archive_file" "tags-lambda" {
  type        = "zip"
  source_dir  = local.tags-lambda
  output_path = "/tmp/tags-lambda.zip"

  depends_on = [null_resource.install_tags_dependencies]
}

resource "aws_lambda_function" "tags-lambda" {
  function_name    = "${terraform.workspace}-tags-lambda"
  role             = aws_iam_role.iam_for_lambda.arn
  filename         = data.archive_file.tags-lambda.output_path
  handler          = "index.handler"
  source_code_hash = data.archive_file.tags-lambda.output_base64sha256
  runtime          = "nodejs14.x"
  timeout          = local.lambda_timeout

  environment {
    variables = {
      ENVIRONMENT      = terraform.workspace
      JWT_SECRET       = var.JWT_SECRET,
      BOOKMARKS_DOMAIN = var.BOOKMARKS_DOMAIN,
    }
  }
}

# AUTH LAMBDA
resource "null_resource" "install_auth_dependencies" {
  provisioner "local-exec" {
    command = "cd ${local.auth-lambda} && npm install"
  }

  triggers = {
    always_run = timestamp()
  }
}

data "archive_file" "auth-lambda" {
  type        = "zip"
  source_dir  = local.auth-lambda
  output_path = "/tmp/auth-lambda.zip"

  depends_on = [null_resource.install_auth_dependencies]
}

resource "aws_lambda_function" "auth-lambda" {
  function_name    = "${terraform.workspace}-auth-lambda"
  role             = aws_iam_role.iam_for_lambda.arn
  filename         = data.archive_file.auth-lambda.output_path
  handler          = "index.handler"
  source_code_hash = data.archive_file.auth-lambda.output_base64sha256
  runtime          = "nodejs14.x"
  timeout          = local.lambda_timeout

  environment {
    variables = {
      ENVIRONMENT              = terraform.workspace
      GOOGLE_API_CLIENT_ID     = var.GOOGLE_API_CLIENT_ID,
      GOOGLE_API_CLIENT_SECRET = var.GOOGLE_API_CLIENT_SECRET,
      JWT_SECRET               = var.JWT_SECRET,
      BOOKMARKS_DOMAIN         = var.BOOKMARKS_DOMAIN,
    }
  }
}

# SPACES LAMBDA
resource "null_resource" "install_spaces_dependencies" {
  provisioner "local-exec" {
    command = "cd ${local.spaces-lambda} && npm install"
  }

  triggers = {
    always_run = timestamp()
  }
}

data "archive_file" "spaces-lambda" {
  type        = "zip"
  source_dir  = local.spaces-lambda
  output_path = "/tmp/spaces-lambda.zip"

  depends_on = [null_resource.install_spaces_dependencies]
}

resource "aws_lambda_function" "spaces-lambda" {
  function_name    = "${terraform.workspace}-spaces-lambda"
  role             = aws_iam_role.iam_for_lambda.arn
  filename         = data.archive_file.spaces-lambda.output_path
  handler          = "index.handler"
  source_code_hash = data.archive_file.spaces-lambda.output_base64sha256
  runtime          = "nodejs14.x"
  timeout          = local.lambda_timeout

  environment {
    variables = {
      ENVIRONMENT      = terraform.workspace
      JWT_SECRET       = var.JWT_SECRET,
      BOOKMARKS_DOMAIN = var.BOOKMARKS_DOMAIN,
    }
  }
}

# BOOKMARKS LAMBDA
resource "null_resource" "install_bookmarks_dependencies" {
  provisioner "local-exec" {
    command = "cd ${local.bookmarks-lambda} && npm install"
  }

  triggers = {
    always_run = timestamp()
  }
}

data "archive_file" "bookmarks-lambda" {
  type        = "zip"
  source_dir  = local.bookmarks-lambda
  output_path = "/tmp/bookmarks-lambda.zip"

  depends_on = [null_resource.install_bookmarks_dependencies]
}

resource "aws_lambda_function" "bookmarks-lambda" {
  function_name    = "${terraform.workspace}-bookmarks-lambda"
  role             = aws_iam_role.iam_for_lambda.arn
  filename         = data.archive_file.bookmarks-lambda.output_path
  handler          = "index.handler"
  source_code_hash = data.archive_file.bookmarks-lambda.output_base64sha256
  runtime          = "nodejs14.x"
  timeout          = local.lambda_timeout

  environment {
    variables = {
      ENVIRONMENT      = terraform.workspace
      JWT_SECRET       = var.JWT_SECRET,
      BOOKMARKS_DOMAIN = var.BOOKMARKS_DOMAIN,
    }
  }
}
