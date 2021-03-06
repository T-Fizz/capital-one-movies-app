import React from 'react'
import Details from './details'
import PropTypes from 'prop-types'
import PlaceholderImage from './img-placeholder.png'

// this component represents results from api
// using "s=(user query)"url param  in search bar.
class Result extends React.Component {
  constructor (props) {
    super(props)
    this.titleStyles = [
      'result-title-no-details',
      'result-title-no-details-hovering'
    ]

    this.state = {
      wasClicked: false,
      titleStyle: 0 // for tracking style of title when hovering
    }
    this.handleOnClick = this.handleOnClick.bind(this)
    this.handleOnMouseOver = this.handleOnMouseOver.bind(this)
    this.handleOnMouseOut = this.handleOnMouseOut.bind(this)
  }

  // result title was clicked
  handleOnClick (event) {
    event.preventDefault()
    this.setState({
      wasClicked: true
    })
  }

  // mouse is over result title
  handleOnMouseOver (event) {
    this.setState({
      titleStyle: 1
    })
  }

  // mouse is not over result title
  handleOnMouseOut (event) {
    this.setState({
      titleStyle: 0
    })
  }

  // render html for (this) result
  render () {
    let resultHTML = (
      <div className='result-no-details-container'>
        <div
          className='result-no-details'
          onClick={this.handleOnClick}
        >
          <div className='result-title-no-details-container'>
            <button
              className={this.titleStyles[this.state.titleStyle]}
              onMouseOver={this.handleOnMouseOver}
              onMouseOut={this.handleOnMouseOut}
            >
              {this.props.title}
            </button>
          </div>
          <div className='result-info-no-details-container'>
            <p className='result-info-no-details'>
              ({this.props.year})
            </p>
          </div>
        </div>
      </div>
    )

    if (this.state.wasClicked === true) {
      // was clicked, create details component and show details
      resultHTML = (
        <div className='result' onClick={this.handleOnClick}>
          <div className='result-info'>
              <div className='result-title-container'>
                  <div className='result-title'>
                      <p>{this.props.title}</p>
                  </div>
                  <div className='result-year'>
                      <p>({this.props.year})</p>
                  </div>
              </div>
              {
                  // create Details Component once clicked
                  this.state.wasClicked &&
                  <Details
                      img={this.props.img}
                      title={this.props.title}
                      type={this.props.type}
                      year={this.props.year}
                      imdbID={this.props.imdbID}
                  />
              }
          </div>
          <div className='result-img-container'>
            {(this.props.img === 'N/A')
              ? (<img
                className='result-img'
                src={PlaceholderImage}
                alt='Movie Poster PlaceHolder'
              />
                )
              : (
              <img
                className='result-img'
                src={this.props.img}
                alt='Movie Poster'
              />
                )
            }
          </div>
        </div>
      )
    }

    if (this.props.isVisible === false) {
      resultHTML = (
        <div className="result-not-visible"></div>
      )
    }

    return (
      resultHTML
    )
  }
}

// props type checking
Result.propTypes = {
  title: PropTypes.string,
  year: PropTypes.number,
  img: PropTypes.string,
  type: PropTypes.string,
  imdbID: PropTypes.string,
  isVisible: PropTypes.bool
}

export default Result
