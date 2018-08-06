import { hot } from 'react-hot-loader'
import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import { Article } from 'reaction/Components/Publishing'
import { ContextProvider } from 'reaction/Components/Artsy'
import { InfiniteScrollNewsArticle } from './InfiniteScrollNewsArticle.tsx'
import { InfiniteScrollArticle } from './InfiniteScrollArticle'
import { EditButton } from 'desktop/apps/article/components/EditButton'
import { StaticArticle } from './layouts/StaticArticle'
import { data as sd } from 'sharify'
import mediator from 'desktop/lib/mediator.coffee'

export default hot(module)(
  class App extends React.Component {
    static propTypes = {
      article: PropTypes.object,
    }

    handleOpenAuthModal = (mode, options) => {
      mediator.trigger('open:auth', {
        mode,
        ...options,
      })
    }

    getArticleLayout = () => {
      const { article, isSuper } = this.props
      const isExperimentInfiniteScroll =
        sd.ARTICLE_INFINITE_SCROLL === 'experiment'
      const hasNav = isSuper || article.seriesArticle

      switch (article.layout) {
        case 'video': {
          return (
            <Article
              {...this.props}
              relatedArticles={article.relatedArticles}
              seriesArticle={article.seriesArticle}
            />
          )
        }
        case 'series': {
          return (
            <Article
              {...this.props}
              relatedArticles={article.relatedArticles}
            />
          )
        }
        case 'news': {
          return (
            <InfiniteScrollNewsArticle articles={[article]} {...this.props} />
          )
        }
        case 'standard':
        case 'feature': {
          if (isExperimentInfiniteScroll || hasNav) {
            return (
              <StaticArticle
                onOpenAuthModal={this.handleOpenAuthModal}
                {...this.props}
              />
            )
          } else {
            return (
              <InfiniteScrollArticle
                onOpenAuthModal={this.handleOpenAuthModal}
                {...this.props}
              />
            )
          }
        }
        default: {
          return (
            <InfiniteScrollArticle
              onOpenAuthModal={this.handleOpenAuthModal}
              {...this.props}
            />
          )
        }
      }
    }

    render() {
      const { article } = this.props

      return (
        <Fragment>
          <EditPortal article={article} />
          <ContextProvider currentUser={sd.CURRENT_USER}>
            <div>{this.getArticleLayout()}</div>
          </ContextProvider>
        </Fragment>
      )
    }
  }
)

class EditPortal extends React.Component {
  static propTypes = {
    article: PropTypes.object,
  }

  render() {
    const { article } = this.props
    const positionTop = article.layout === 'news' ? 125 : null

    try {
      return ReactDOM.createPortal(
        <EditButton
          channelId={article.channel_id}
          slug={article.slug}
          positionTop={positionTop}
        />,
        document.getElementById('react-portal')
      )
    } catch (e) {
      return false
    }
  }
}
