;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-yaochi" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M875.808 148.16c-111.04-111.04-291.072-111.04-402.192 0-87.52 87.536-105.76 217.808-55.328 323.488L64.88 825.056l6.592 127.488 127.472 6.576 140.64-140.64c0 0-67.024-67.04-44.704-89.392 22.336-22.336 89.376 44.688 89.376 44.688l-44.672 44.704 134.048-134.064-44.688 44.672c0 0-67.024-67.04-44.688-89.392 22.336-22.336 89.376 44.72 89.376 44.72l78.752-78.72c105.68 50.4 235.936 32.16 323.44-55.344C986.896 439.296 986.896 259.232 875.808 148.16zM294.88 863.152l-44.688 44.688c0 0-67.024-67.024-44.672-89.36C227.856 796.16 294.88 863.152 294.88 863.152zM741.776 416.304c-37.04 37.008-97.04 37.008-134.064 0-37.008-37.04-37.008-97.04 0-134.064 37.008-37.024 97.008-37.024 134.064 0C778.8 319.248 778.8 379.248 741.776 416.304z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-yonghu" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M853.333333 725.333333c-39.552-13.610667-79.786667-27.946667-128-42.666667-64.554667-19.712-128.896-42.752-128.896-42.752l0-42.666667c0 0 85.333333-85.248 85.333333-256 0-42.666667 0.042667-53.802667 0.042667-84.650667 0-107.349333-77.226667-165.632-169.813333-171.093333L512 85.418667c0 0 0 0 0 0s0 0 0 0l0 0.128c-92.586667 5.461333-169.813333 63.744-169.813333 171.093333 0 30.848 0.042667 41.984 0.042667 84.650667 0 170.752 85.333333 256 85.333333 256l0 42.666667c0 0-64.341333 23.04-128.896 42.752-48.213333 14.72-88.448 29.056-128 42.666667-85.333333 29.354667-85.333333 170.666667-85.333333 170.666667l0 42.666667 426.666667 0 426.666667 0 0-42.666667C938.666667 896 938.666667 754.688 853.333333 725.333333z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)