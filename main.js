window.onload = () => {
  (function () {
    let preload = document.getElementById('preload')
    let i = 0.9
    let a = setInterval(() => {
      if (i > 0) {
        i -= 0.05
        preload.style.opacity = i
      }
      if (i < 0.01) {
        clearInterval(a)
        preload.style.display = 'none';
      }
    }, 13)
    document.getElementsByClassName('game')[0].classList.add('show')
  })()

  for (let td of document.getElementsByTagName('td')) {
    td.textContent = ''
    td.addEventListener('click', cellClick)
  }

  let LAST_PLAYER

  function cellClick (element) {
    element = element.target
    if (element.textContent === 'X' || element.textContent === 'O') {
      return
    }
    if (LAST_PLAYER === '' || LAST_PLAYER === 'O') {
      element.textContent = 'X'
      LAST_PLAYER = 'X'
    } else {
      element.textContent = 'O'
      LAST_PLAYER = 'O'
    }
    l(`Player [${LAST_PLAYER}] clicked cell #${element.id.slice(1)}.`)
    winCheck()
  }

  const WIN_PATTERNS = [
    [ 1, 2, 3 ],
    [ 4, 5, 6 ],
    [ 7, 8, 9 ],
    [ 1, 4, 7 ],
    [ 2, 5, 8 ],
    [ 3, 6, 9 ],
    [ 1, 5, 9 ],
    [ 3, 5, 7 ],
  ]

  function winCheck() {
    for (let i = 0; i < WIN_PATTERNS.length; i++) {
      const item = WIN_PATTERNS[i]
      if ((cellValue(item[0]) === cellValue(item[1])) &&
        (cellValue(item[1]) === cellValue(item[2])) &&
        (cellValue(item[2]) === 'X' || cellValue(item[2]) === 'O')) {
        showWinner(cellValue(item[2]), i)
        for (let td of document.getElementsByTagName('td')) {
          td.removeEventListener('click', cellClick)
        }
        return true
      }
      else if ((WIN_PATTERNS.length - 1) === i) {
        drawCheck()
        return false
      }
    }
  }

  function drawCheck() {
    for (let i = 1; i <= 9; i++) {
      if (cellValue(i) !== 'X' && cellValue(i) !== 'O') {
        return false
      }
    }
    showDraw()
    // l(`DRAW!`)
    // alert(`DRAW!`)
    // newGame()
    return true
  }

  function cellValue(n) {
    let c = document.getElementById('d' + n)
    return (c) ? c.textContent : ''
  }

  function newGame() {
    for (let td of document.getElementsByTagName('td')) {
      td.textContent = ''
      td.addEventListener('click', cellClick)
    }
    document.getElementById('logs').innerHTML = ''
    let result = document.getElementsByClassName('container')[0].lastChild
    result.parentNode.removeChild(result)
    document.getElementsByClassName('game')[0].classList.remove('fade')
    document.getElementsByClassName('game')[0].classList.add('show')
  }

  function showWinner(winner, pattern) {
    l(`Player [${winner}] is the WINNER! (Pattern #${pattern})`)
    document.getElementsByClassName('game')[0].classList.remove('show')
    document.getElementsByClassName('game')[0].classList.add('fade')
    let result = new DOMParser()
    result = result.parseFromString('<div class="result"><span></span></div>', 'text/html')
    result.body.getElementsByTagName('div')[0].classList.add('win')
    result.body.getElementsByTagName('span')[0].textContent = `PLAYER -(${winner})- HAS WON!`
    document.getElementsByClassName('container')[0].innerHTML += result.body.innerHTML
    // alert(`Player [${winner}] is the WINNER!`)
    setTimeout(()=>{newGame()}, 3000)
  }

  function showDraw() {
    l(`DRAW!`)
    document.getElementsByClassName('game')[0].classList.remove('show')
    document.getElementsByClassName('game')[0].classList.add('fade')
    let result = new DOMParser()
    result = result.parseFromString('<div class="result"><span></span></div>', 'text/html')
    result.body.getElementsByTagName('span')[0].textContent = `DRAW!`
    document.getElementsByClassName('container')[0].innerHTML += result.body.innerHTML
    // alert(`Player [${winner}] is the WINNER!`)
    setTimeout(()=>{newGame()}, 3000)
  }

  function l (str) {
    document.getElementById('logs').innerHTML += `<p>${str}</p>`
    let logs = document.querySelector('#logs');
    logs.scrollTop = logs.scrollHeight - logs.clientHeight;
  }
}
