output "api_gateway_url" {
  value = aws_apigatewayv2_api.http_api.api_endpoint
}

output "alb_dns" {
  value = aws_lb.app.dns_name
}

output "reserva_target_group_arn" {
  value = aws_lb_target_group.reserva_tg.arn
}
