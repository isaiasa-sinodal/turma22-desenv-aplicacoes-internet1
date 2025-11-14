package br.com.sinodalprogresso.rest.dto

data class MovieDTO(
    val id: Long? = null,
    val title: String,
    val director: String,
    val year: Int,
    val genre: String
)