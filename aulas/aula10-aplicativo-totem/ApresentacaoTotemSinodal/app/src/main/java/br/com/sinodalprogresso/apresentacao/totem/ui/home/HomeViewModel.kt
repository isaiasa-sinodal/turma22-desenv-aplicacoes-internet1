package br.com.sinodalprogresso.apresentacao.totem.ui.home

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel

class HomeViewModel : ViewModel() {

    private val _text = MutableLiveData<String>().apply {
        value = "Curso Técnico em Informática"
    }
    val text: LiveData<String> = _text
}