import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getUsersBusinesses } from '../../../store/firebase/dataBusinessesSelectors'
import { HomeLocks } from './components/HomeLocks/HomeLocks'
import { addLock, resetLock, openLock } from './state/actions'
import { getLocks } from './state/getLocks'

export class HomeComponent extends React.Component {
  static propTypes = {
    businesses: PropTypes.array,
    locks: PropTypes.object,
    addLock: PropTypes.func,
    resetLock: PropTypes.func,
    openLock: PropTypes.func
  }
  componentDidUpdate(prevProps) {
    if (prevProps.businesses.length !== this.props.businesses.length) {
      this.props.businesses.forEach(el => {
        Object.keys(el.doors).forEach(key => {
          this.props.addLock(key)
        })
      })
    }
  }
  componentDidMount() {
    this.props.businesses.forEach(el => {
      Object.keys(el.doors).forEach(key => {
        this.props.addLock(key)
      })
    })
  }
  render() {
    const { businesses, locks, openLock } = this.props
    return <HomeLocks {...{ businesses, locks, openLock }} />
  }
}

const mapStateToProps = state => ({
  locks: getLocks(state),
  businesses: getUsersBusinesses(state)
})

const mapDispatchToProps = dispatch => ({
  openLock: lock => dispatch(openLock(lock)),
  resetLock: key => dispatch(resetLock(key)),
  addLock: key => dispatch(addLock(key))
})

export const Home = connect(mapStateToProps, mapDispatchToProps)(HomeComponent)
