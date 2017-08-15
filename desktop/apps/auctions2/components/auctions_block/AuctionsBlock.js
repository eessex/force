// import colorThief from 'color-thief'
import moment from 'moment'
import React from 'react'

function liveDate(auction) {
  let date
  if (moment(auction.registration_ends_at) > moment()) {
    date = formattedDate(auction.registration_ends_at, false, true)
  } else if (moment(auction.live_start_at) > moment()) {
    date = formattedDate(auction.live_start_at)
  } else if (moment(auction.end_at) > moment()) {
    date = 'In Progress'
  }
  return date
}

function timedDate(auction) {
  let date
  if (moment(auction.start_at) > moment()) {
    date = formattedDate(auction.start_at)
  } else {
    date = formattedDate(auction.end_at, true)
  }
  return date
}

function formattedDate(date, isStarted, isRegister) {
    let formattedDate
    if (isStarted) {
      formattedDate = moment(date).fromNow().replace('in ', '') + ' left'
    } else if (isRegister) {
      if (moment().diff(moment(date), 'hours') > -24) {
        formattedDate = 'Register by ' + moment(date).format('ha')
      } else {
        formattedDate = 'Register by ' + moment(date).format('MMM D, ha')
      }
    } else {
      formattedDate = 'Live ' + moment(date).fromNow()
    }
    return formattedDate
}

function renderImage (auction) {
  if (auction.cover_image) {
    const colors = getAverageColor(auction.cover_image.cropped.url)
    if (colors && colors.r) {
      return <img src={auction.cover_image.cropped.url} />
    } else {
      return false
    }
  }
}

function onImageLoad (image) {
  const canvas = document.createElement('canvas')
  let ctx = canvas.getContext('2d')
  const width = canvas.width = image.naturalWidth
  const height = canvas.height = image.naturalWidth
  ctx.drawImage(image, 0, 0)
  const imageData = ctx.getImageData(0, 0, width, height)
  const data = imageData.data
  let r = 0
  let g = 0
  let b = 0

  for (var i = 0, l = data.length; i < l; i += 4) {
    r += data[i]
    g += data[i+1]
    b += data[i+2]
  }

  r = Math.floor(r / (data.length / 4))
  g = Math.floor(g / (data.length / 4))
  b = Math.floor(b / (data.length / 4))
  return { r: r, g: g, b: b }
}

function getAverageColor(img) {
  if (typeof window !== 'undefined') {
    const image = new Image()
    image.setAttribute('crossOrigin', '')
    image.src = img + '?' + new Date().getTime() // to mask cross origin
    image.onload = async function () {
      const colors = await onImageLoad(this)
      return colors
    }
    // let ctx = canvas.getContext('2d')
    // const width = canvas.width = this.naturalWidth
    // const height = canvas.height = this.naturalWidth
    // ctx.drawImage(image, 0, 0)
    // const imageData = ctx.getImageData(0, 0, width, height)
    // const data = imageData.data
    // let r = 0
    // let g = 0
    // let b = 0

    // for (var i = 0, l = data.length; i < l; i += 4) {
    //   r += data[i]
    //   g += data[i+1]
    //   b += data[i+2]
    // }

    // r = Math.floor(r / (data.length / 4))
    // g = Math.floor(g / (data.length / 4))
    // b = Math.floor(b / (data.length / 4))
    // return { r: r, g: g, b: b }
    // }
    // if (colors.r) {
    //   return colors
    // }
  }
}

function BlockItem(auction, key, live) {
  return (
    <a
      key={key}
      href={auction.id}
      className='auctions-block__item'>
      <div className='auctions-block__item-header'>
        {live ? <div className='live'>Live</div> : false }
        {auction.name}
      </div>
      <div className='auctions-block__item-body'>
        {renderImage(auction)}
        <div className='date'>
          {live ? liveDate(auction) : timedDate(auction)}
        </div>
      </div>
    </a>
  )
}

function AuctionsBlock (props) {
  return (
    <div className='auctions-block'>
      <div className='auctions-block__title'>
        {props.live ? 'Ongoing Live Auctions'  : 'Ongoing Timed Auctions'}
      </div>
      <div className='auctions-block__items'>
        { props.auctions.map((auction, key) => (
          BlockItem(auction, key, props.live)
        ))}
      </div>
    </div>
  )
}

export default AuctionsBlock

