package br.com.sinodalprogresso.apresentacao.totem

import android.annotation.SuppressLint
import android.os.Bundle
import android.view.MotionEvent
import android.widget.ImageView
import android.widget.LinearLayout
import android.widget.ScrollView
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.drawerlayout.widget.DrawerLayout
import androidx.navigation.findNavController
import androidx.navigation.ui.AppBarConfiguration
import br.com.sinodalprogresso.apresentacao.totem.databinding.ActivityMainBinding
import com.google.android.material.snackbar.Snackbar

class MainActivity : AppCompatActivity() {

    private lateinit var appBarConfiguration: AppBarConfiguration
    private lateinit var binding: ActivityMainBinding
    private lateinit var scrollView: ScrollView

    @SuppressLint("ClickableViewAccessibility", "DiscouragedApi")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // setSupportActionBar(binding.appBarMain.toolbar)

        binding.appBarMain.fab.setOnClickListener { view ->
            Snackbar.make(
                view,
                "Arraste pra cima para conhecer nossa escola",
                Snackbar.LENGTH_LONG
            )
                .setAction("Action", null)
                .setAnchorView(R.id.fab)
                .show()
        }

        // esconder e reaparecer imagem
        binding.appBarMain.fab.setOnTouchListener { _, event ->
            when (event.action) {
                MotionEvent.ACTION_DOWN -> binding.appBarMain.fab.animate().alpha(0f).setDuration(150).start()
                MotionEvent.ACTION_UP, MotionEvent.ACTION_CANCEL -> binding.appBarMain.fab.animate().alpha(1f).setDuration(150).start()
            }
            false
        }

        scrollView = findViewById(R.id.scrollViewHome)
        scrollView.setOnTouchListener { _, event ->
            when (event.action) {
                MotionEvent.ACTION_DOWN -> binding.appBarMain.fab.animate().alpha(0f).setDuration(150).start()
                MotionEvent.ACTION_UP, MotionEvent.ACTION_CANCEL -> binding.appBarMain.fab.animate().alpha(1f).setDuration(150).start()
            }
            false
        }

        val drawerLayout: DrawerLayout = binding.drawerLayout
        val navController = findNavController(R.id.nav_host_fragment_content_main)

        appBarConfiguration = AppBarConfiguration(
            setOf(
                R.id.nav_home, R.id.nav_gallery, R.id.nav_slideshow, R.id.nav_save
            ),
            drawerLayout
        )

        // setupActionBarWithNavController(navController, appBarConfiguration)

        // Se quiser menu lateral, pode manter:
        // binding.navView.setupWithNavController(navController)

        val totalSlides = resources.getInteger(R.integer.totalSlides)

        val slidesContainer = findViewById<LinearLayout>(R.id.slidesContainer)
        for (i in 1.. totalSlides) {
            buildSlide(i, slidesContainer)
        }
    }

    fun buildSlide(i : Int, slidesContainer: LinearLayout) {

        val textResId = resources.getIdentifier("slide$i", "string", packageName)
        val slideText = if (textResId != 0) getString(textResId) else "Slide $i"

        val imageResId = resources.getIdentifier("slide$i", "drawable", packageName)

        val textView = TextView(this).apply {
            text = slideText
            textSize = 32f
            setTextColor(android.graphics.Color.WHITE)
            textAlignment = TextView.TEXT_ALIGNMENT_CENTER
            setPadding(0, 40, 0, 20)
        }

        val imageView = ImageView(this).apply {
            if (imageResId != 0) setImageResource(imageResId)
            adjustViewBounds = true
            scaleType = ImageView.ScaleType.CENTER_INSIDE
            setPadding(0, 20, 0, 60)
            layoutParams = LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.WRAP_CONTENT,
                LinearLayout.LayoutParams.WRAP_CONTENT
            ).apply {
                gravity = android.view.Gravity.CENTER_HORIZONTAL
            }
        }

        slidesContainer.addView(textView)
        slidesContainer.addView(imageView)
    }

    override fun onCreateOptionsMenu(menu: android.view.Menu): Boolean {
        return true
    }

    override fun onSupportNavigateUp(): Boolean {
        val navController = findNavController(R.id.nav_host_fragment_content_main)
        //return navController.navigateUp(appBarConfiguration)  || super.onSupportNavigateUp()
        return super.onSupportNavigateUp()
    }
}
