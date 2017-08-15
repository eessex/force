import moment from 'moment'
import React, { Component } from 'react'

export default class AuctionsBlock extends Component {
  constructor(props) {
    super(props)

    this.state = {
      colors: []
    }
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      this.setImageColors(this.props.auctions)
      this.setState({ colors: ['red'] })
    }
  }

  async setImageColors(auctions) {
    await Promise.all(auctions.map(
      async (auction, i) => {
        if (auction.cover_image) {
          const content = await this.setupImageForColors(auction.cover_image)
          console.log(content)
        }
      }
    ))
  }

  setupImageForColors(img) {
    const image = new Image()
    image.setAttribute('crossOrigin', '')
    image.src = img.cropped.url + '?' + new Date().getTime()
    const canvas = document.createElement('canvas')
    let ctx = canvas.getContext('2d')
    image.onload = function () {
      return 'hello'
    }
  }



        // const width = canvas.width = image.naturalWidth
        // const height = canvas.height = image.naturalWidth
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
        // return rgb = { r: r, g: g, b: b }

  renderImage(auction) {
    if (auction.cover_image) {
      return <img src={auction.cover_image.cropped.url} />
    } else {
      return false
    }
  }

  liveDate(auction){
    let date
    if (moment(auction.registration_ends_at) > moment()) {
      date = this.formattedDate(auction.registration_ends_at, false, true)
    } else if (moment(auction.live_start_at) > moment()) {
      date = this.formattedDate(auction.live_start_at)
    } else if (moment(auction.end_at) > moment()) {
      date = 'In Progress'
    }
    return date
  }

  timedDate(auction){
    let date
    if (moment(auction.start_at) > moment()) {
      date = this.formattedDate(auction.start_at)
    } else {
      date = this.formattedDate(auction.end_at, true)
    }
    return date
  }

  formattedDate(date, isStarted, isRegister){
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

  BlockItem(auction, key, live) {
    return (
      <a
        key={key}
        href={auction.id}
        className='auctions-block__item'
        style={{backgroundColor: this.state.colors[key] || 'white' }} >
        <div className='auctions-block__item-header'>
          {live ? <div className='live' style={{color: this.state.colors[key] || 'white' }}>Live</div> : false }
          {auction.name}
        </div>
        <div className='auctions-block__item-body'>
          {this.renderImage(auction)}
          <div className='date'>
            {live ? this.liveDate(auction) : this.timedDate(auction)}
          </div>
        </div>
      </a>
    )
  }

  render() {
    const { live, auctions } = this.props
    return (
    <div className='auctions-block'>
      <div className='auctions-block__title'>
      </div>
      <div className='auctions-block__items'>
        { auctions.map((auction, key) => (
          this.BlockItem(auction, key, live)
        ))}
      </div>
    </div>
    );
  }
}
