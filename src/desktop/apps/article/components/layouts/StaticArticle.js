import ArticleModel from 'desktop/models/article.coffee'
import PropTypes from 'prop-types'
import React from 'react'
import { Article } from 'reaction/Components/Publishing'
import { setupFollows, setupFollowButtons } from '../FollowButton.js'
import _EditorialSignupView from 'desktop/components/email/client/editorial_signup.coffee'
import _SuperArticleView from 'desktop/components/article/client/super_article.coffee'

// FIXME: Rewire
let SuperArticleView = _SuperArticleView
let EditorialSignupView = _EditorialSignupView

export class StaticArticle extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      following: setupFollows() || null,
    }
  }
  static propTypes = {
    article: PropTypes.object,
    isMobile: PropTypes.bool,
    onOpenAuthModal: PropTypes.func,
    renderTime: PropTypes.number,
    showTooltips: PropTypes.bool,
    templates: PropTypes.object,
  }

  componentDidMount() {
    const { article, isSuper } = this.props
    // TODO: Replace with relay follow
    setupFollowButtons(this.state.following)
    // Comment until we are ready to launch the test
    // splitTest('article_infinite_scroll').view()

    if (isSuper) {
      // setup superArticle header/footer
      new SuperArticleView({
        el: document.querySelector('body'),
        article: new ArticleModel(article),
      })
    }
    if (!isSuper && article.layout === 'standard') {
      // setup mobile email popup
      new EditorialSignupView({
        el: document.querySelector('body'),
      })
    }
  }

  render() {
    const {
      article,
      isMobile,
      isSuper,
      onOpenAuthModal,
      renderTime,
      showTooltips,
      templates: { SuperArticleFooter, SuperArticleHeader } = {},
    } = this.props

    return (
      <div>
        {isSuper && (
          <div
            dangerouslySetInnerHTML={{
              __html: SuperArticleHeader,
            }}
          />
        )}

        <Article
          article={article}
          display={article.display}
          isMobile={isMobile}
          onOpenAuthModal={onOpenAuthModal}
          relatedArticlesForPanel={article.relatedArticlesPanel}
          relatedArticlesForCanvas={article.relatedArticlesCanvas}
          renderTime={renderTime}
          showTooltips={showTooltips}
        />

        {isSuper && (
          <div
            dangerouslySetInnerHTML={{
              __html: SuperArticleFooter,
            }}
          />
        )}
      </div>
    )
  }
}
