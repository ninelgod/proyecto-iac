resource "aws_apigatewayv2_api" "http_api" {
  name          = "vet-http-api"
  protocol_type = "HTTP"
}

# Integración para reserva -> ALB
resource "aws_apigatewayv2_integration" "reserva_integr" {
  api_id           = aws_apigatewayv2_api.http_api.id
  integration_type = "HTTP_PROXY"
  integration_uri  = "http://${aws_lb.app.dns_name}/reserva"  # el ALB recibirá /reserva path
  payload_format_version = "1.0"
  connection_type = "INTERNET"
}

# Integración para pago -> ALB
resource "aws_apigatewayv2_integration" "pago_integr" {
  api_id           = aws_apigatewayv2_api.http_api.id
  integration_type = "HTTP_PROXY"
  integration_uri  = "http://${aws_lb.app.dns_name}/pago"
  payload_format_version = "1.0"
  connection_type = "INTERNET"
}

# Ruta /reserva/{proxy+}
resource "aws_apigatewayv2_route" "reserva_route" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "ANY /reserva/{proxy+}"
  target    = "integrations/${aws_apigatewayv2_integration.reserva_integr.id}"
}

# Ruta /pago/{proxy+}
resource "aws_apigatewayv2_route" "pago_route" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "ANY /pago/{proxy+}"
  target    = "integrations/${aws_apigatewayv2_integration.pago_integr.id}"
}

# Stage
resource "aws_apigatewayv2_stage" "prod" {
  api_id      = aws_apigatewayv2_api.http_api.id
  name        = "$default"
  auto_deploy = true
}
