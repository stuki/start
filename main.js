function divGen(parent, sizeX, sizeY, rotation, linestyle, radius) {
	parent = document.getElementById(parent)
  	node = document.createElement('div')
	node.style.width = sizeX + "px"
  	node.style.height = sizeY + "px"
  	node.style.borderStyle = linestyle
  	node.style.transform = "rotate(" + rotation + "deg)"
  	node.style.float = "left"
  	node.style.borderRadius = radius + "px"

  	parent.appendChild(node)
}

function parentDivGen(parent, name, height) {
	parent = document.getElementById(parent)
  	node = document.createElement('div')
  	node.id = "line" + name
  	node.style.height = height + "px"
  	node.style.position = "relative"
  	node.style.float = "left"

  	parent.appendChild(node)
}

function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min)
}

function colorChange() {

	mouseX = mouseY = 0
	container = document.getElementById("container")

	document.addEventListener("mousemove", function (e) {
		if (!clicked) {
			x = e.pageX / window.innerWidth
			y = e.pageY / window.innerHeight

			para.rgbX = 215 + Math.floor(x*30)
			para.rgbY = 215 + Math.floor(y*30)

			container.style.background = "RGB(255, " + para.rgbY + ", " + para.rgbX +")"
		}
	})
	document.addEventListener("click", function (e) {
		if (!clicked) {
			clicked = true
			art = document.getElementById("art")

			url = Object.keys(para).map(function(k) {
    		return encodeURIComponent(k) + '=' + encodeURIComponent(para[k])
			}).join('&')

			window.history.replaceState(null, null, "?" + url);

		} else {
			clicked = false
		}
	})
}

function parseJsonUrl(){
	query = location.search.substr(1)
	if (query === "") {return false}

	result = {}
	query.split("&").forEach(function(part) {
		item = part.split("=")
		result[item[0]] = decodeURIComponent(item[1])
	})
	return result
}

function maxValue(i, max, min) {
	if (i > min) {
		if (i < max) {
			console.log(i)
			return i
		} else return max
	} else return min
}

function patternGenerator(p) {

	clicked = false;
	para = {}
	styles = ["dotted", "dashed", "solid", "double"]
	w = document.getElementById(p).offsetWidth
	h = document.getElementById(p).offsetHeight

	if (!parseJsonUrl()) {
		para.deg = randomInt(-45, 45)
		para.style = styles[randomInt(0, (styles.length) - 1 )]
		para.size = randomInt(10, 100)
		para.radius = randomInt(0, (para.size / 2) )
		para.repeatX = Math.floor(maxValue((w / para.size), 50, 1))
		para.repeatY = Math.floor(maxValue((h / para.size), 60, 1))
		console.log(para)
	} else {
		para = parseJsonUrl()
		clicked = true
	}

	for (var y = 0; y < para.repeatY; y++) {

		parentDivGen(p, y, para.size)

		for (var x = 0; x < para.repeatX; x++) {
			divGen("line" + y, 
			para.size, 
			para.size, 
			para.deg, 
			para.style, 
			para.radius)
		}
		
	}

	colorChange()
}

