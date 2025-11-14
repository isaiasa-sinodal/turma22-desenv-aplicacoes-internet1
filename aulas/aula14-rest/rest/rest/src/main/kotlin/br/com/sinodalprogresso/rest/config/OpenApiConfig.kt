package br.com.sinodalprogresso.rest.config

import io.swagger.v3.oas.models.OpenAPI
import io.swagger.v3.oas.models.info.Info
import io.swagger.v3.oas.models.info.Contact
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class OpenApiConfig {

    @Bean
    fun customOpenAPI(): OpenAPI {
        return OpenAPI().info(
            Info()
                .title("Movie API")
                .description("API de exemplo com endpoints para filmes.")
                .version("1.0.0")
                .contact(
                    Contact()
                        .name("Equipe Sinodal Progresso")
                        .email("contato@sinodalprogresso.com.br")
                )
        )
    }
}
