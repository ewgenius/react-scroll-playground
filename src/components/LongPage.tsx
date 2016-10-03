import './LongPage.scss'
import * as React from 'react'
import { Props, Component } from 'react'

export interface LongPageState {
  stickyHeader?: boolean
  prevHeaderOffset?: number
  trackScroll?: boolean
  scrollPosition?: number
}

export class LongPage extends Component<Props<any>, LongPageState> {
  private scrollContainer: HTMLElement
  private header: HTMLElement

  constructor() {
    super()
    this.state = {
      stickyHeader: false,
      prevHeaderOffset: 0,
      trackScroll: false,
      scrollPosition: 0
    }
  }

  componentDidMount() {
    this.scrollContainer = this.refs['scroll-container'] as HTMLElement
    this.header = this.refs['header'] as HTMLElement
  }

  onScroll() {
    if (this.scrollContainer) {
      if (this.state.trackScroll) {
        this.setState({
          scrollPosition: this.scrollContainer.scrollTop
        })
      }

      if (
        this.scrollContainer.scrollTop >= this.header.offsetTop &&
        !this.state.stickyHeader
      ) {
        this.setState({
          stickyHeader: true,
          prevHeaderOffset: this.header.offsetTop
        })
      }

      if (
        this.scrollContainer.scrollTop < this.state.prevHeaderOffset &&
        this.state.stickyHeader
      ) {
        this.setState({
          stickyHeader: false
        })
      }
    }
  }

  render() {
    return <div
      ref='scroll-container'
      className='long-page'
      onScroll={() => this.onScroll()}>
      <div className='super-header'>
        some top info
      </div>
      <div className='dev-tools'>
        {this.state.scrollPosition}
        <br />
        <button onClick={() => this.setState({
          trackScroll: !this.state.trackScroll
        })}>{this.state.trackScroll ? 'disable scroll tracking' : 'enable scroll tracking'}</button>
      </div>
      <header ref='header' className={this.state.stickyHeader ? 'sticky' : ''}>header</header>
      <main>main</main>
      <footer>footer</footer>
    </div>
  }
}