const mapWorld = document.getElementById('map-world')
const tooltip = document.getElementById('tooltip')
const tooltipName = document.getElementById('tooltip-name')
const tooltipDesc = document.getElementById('tooltip-desc')
const modalOverlay = document.getElementById('modal-overlay')
const modalTitle = document.getElementById('modal-title')
const modalDesc = document.getElementById('modal-desc')
const modalClose = document.getElementById('modal-close')
const zoomIn = document.getElementById('zoom-in')
const zoomOut = document.getElementById('zoom-out')

let scale = 1
let translateX = 0
let translateY = 0

function updateTransform() {
    mapWorld.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`
}
zoomIn.addEventListener ('click', () => {
    scale = Math.min(scale + 0.2, 3)
    updateTransform()
})

zoomOut.addEventListener('click', () => {
    scale = Math.max(scale - 0.2, 0.5)
    updateTransform()
})

document.addEventListener('wheel', (e) => {
    e.preventDefault()
    if (e.deltaY < 0) {
      scale = Math.min(scale + 0.1, 3)
    } else {
      scale = Math.max(scale - 0.1, 0.5)
    }
    updateTransform()
}, {passive: false}) 

let isDragging =  false
let startX = 0
let startY = 0

document.addEventListener('mousedown', (e) => {
  isDragging = true
  startX = e.clientX - translateX
  startY = e.clientY - translateY
})

document.addEventListener('mousemove' ,(e) => {
  if  (!isDragging) return
  translateX = e.clientX - startX
  translateY = e.clientY - startY
  updateTransform()
})

document.addEventListener('mouseup' ,() => {
  isDragging = false
})

document.querySelectorAll('.marker').forEach(marker =>{
  marker.style.left = marker.dataset.x + '%'
  marker.style.top = marker.dataset.y + '%'
})

document.querySelectorAll('.marker').forEach(marker => {
  marker.addEventListener('mouseover', (e) => {
    tooltipName.textContent = marker.dataset.name
    tooltipDesc.textContent = marker.dataset.desc
    tooltip.style.opacity ='1'
    tooltip.style.left =  e.clientX + 14 + 'px'
    tooltip.style.top = e.clientY + 14 + 'px'
  })
  marker.addEventListener('mouseleave', () => {
    tooltip.style.opacity = '0'
  })
})

document.querySelectorAll('.marker').forEach(marker => {
  marker.addEventListener ('click', () => {
    modalTitle.textContent = marker.dataset.name
    modalDesc.textContent = marker.dataset.desc
    modalOverlay.style.opacity = '1'
    modalOverlay.style.pointerEvents = 'all'
    modalOverlay.classList.add('open')
  })
})

modalClose.addEventListener('click', () => {
  modalOverlay.style.opacity = '0'
  modalOverlay.style.pointerEvents = 'none'
  modalOverlay.classList.remove('open')
})