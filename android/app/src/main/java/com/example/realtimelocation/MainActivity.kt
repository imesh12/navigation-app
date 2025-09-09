package com.example.realtimelocation

import com.facebook.react.ReactActivity

class MainActivity : ReactActivity() {
    override fun getMainComponentName(): String? {
        return "navigationapp" // must match AppRegistry.registerComponent in JS
    }
}
