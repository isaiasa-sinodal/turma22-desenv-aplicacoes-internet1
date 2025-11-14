package br.com.sinodalprogresso.rest.controller

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import br.com.sinodalprogresso.rest.dto.MovieDTO

@RestController
@RequestMapping("/movies")
class MovieController {

    private val movies = mutableListOf<MovieDTO>()

    @GetMapping
    fun getAllMovies(): ResponseEntity<List<MovieDTO>> {
        println("GET /movies - retornando ${movies.size} filmes")
        return ResponseEntity.ok(movies)
    }

    @GetMapping("/{id}")
    fun getMovieById(@PathVariable id: Long): ResponseEntity<MovieDTO> {
        println("GET /movies/$id - buscando filme com id=$id")
        val movie = movies.find { it.id == id }
        return if (movie != null) {
            println("Encontrado: $movie")
            ResponseEntity.ok(movie)
        } else {
            println("Filme id=$id não encontrado")
            ResponseEntity.notFound().build()
        }
    }

    @PostMapping
    fun createMovie(@RequestBody dto: MovieDTO): ResponseEntity<MovieDTO> {
        println("POST /movies - recebido: $dto")
        val newMovie = dto.copy(id = (movies.maxOfOrNull { it.id ?: 0 } ?: 0) + 1)
        movies.add(newMovie)
        println("Novo filme criado: $newMovie")
        return ResponseEntity.status(HttpStatus.CREATED).body(newMovie)
    }

    @PutMapping("/{id}")
    fun updateMovie(@PathVariable id: Long, @RequestBody dto: MovieDTO): ResponseEntity<MovieDTO> {
        println("PUT /movies/$id - recebido: $dto")
        val index = movies.indexOfFirst { it.id == id }
        return if (index != -1) {
            val updated = dto.copy(id = id)
            movies[index] = updated
            println("Atualizado: $updated")
            ResponseEntity.ok(updated)
        } else {
            println("Filme id=$id não encontrado para atualização")
            ResponseEntity.notFound().build()
        }
    }

    @DeleteMapping("/{id}")
    fun deleteMovie(@PathVariable id: Long): ResponseEntity<Void> {
        println("DELETE /movies/$id - tentativa de exclusão")
        val removed = movies.removeIf { it.id == id }
        return if (removed) {
            println("Filme id=$id removido com sucesso")
            ResponseEntity.noContent().build()
        } else {
            println("Filme id=$id não encontrado para remoção")
            ResponseEntity.notFound().build()
        }
    }
}
