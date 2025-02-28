import p5 from 'p5'

export const convertImageToAscii = (imageUrl, density) => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      return reject(new Error('Window is not available'));
    }

    const sketch = (p) => {
      let img

      p.preload = () => {
        img = p.loadImage(imageUrl)
      }

      p.setup = () => {
        p.noCanvas()
        
        const asciiChars = density
        const asciiImage = []
        img.loadPixels()
        
        for (let y = 0; y < img.height; y += 1) {
          let row = ''
          for (let x = 0; x < img.width; x += 1) {
            const index = (x + y * img.width) * 4
            const r = img.pixels[index]
            const g = img.pixels[index + 1]
            const b = img.pixels[index + 2]
            const avg = (r + g + b) / 3
            const charIndex = Math.floor((avg / 255) * (asciiChars.length - 1))
            row += asciiChars[charIndex]
          }
          asciiImage.push(row)
        }
        
        resolve(asciiImage.join('\n'))
        p.remove() // Cleanup after rendering
      }
    }

    new p5(sketch)
  })
}
