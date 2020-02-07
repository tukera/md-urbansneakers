import React from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import _debounce from 'lodash/debounce';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';

import { connect } from 'react-redux';

import { updateInputValue, clearSuggestions, loadSuggestions } from '../../../actions/search';
import './index.scss';

import { SearchIcon, CloseIcon } from '../../Icons';

class HeaderSearchForm extends React.Component {
  static renderSectionTitle(section) {
    let link = section.key;
    if (link === 'magazines') link = 'magazin';

    return section.title ? (
      <section>
        <strong className="header-search-form__autosuggest-section-title-text">{section.title} ({section.total})</strong>
        <a className="header-search-form__autosuggest-section-title-link" href={`/${link}`}>Alle</a>
      </section>
    ) : null;
  }

  static getSectionSuggestions(section) {
    return section.results;
  }

  static renderSuggestion(suggestion) {
    return suggestion.img ? (
      <section className="header-search-form__suggestion-item_with-image">
        <img src={suggestion.img} alt="" />
        <span>
          {suggestion.name}
        </span>
      </section>
    ) : (
      <div>
        {suggestion.name}
      </div>
    );
  }

  static getSuggestionValue(suggestion) {
    return suggestion.name;
  }

  constructor(props) {
    super(props);
    this.state = {
      showCloseButton: false,
    };

    this.debouncedLoadSuggestions = _debounce(this.props.onSuggestionsFetchRequested, 500);
    this.placeholder = 'Modelle, Marken, News...';
  }

  onSuggestionSelected(suggestion) {
    if (suggestion.link) {
      this.props.history.push(suggestion.link);
      this.props.onChange(null, { newValue: '' });
    }
    if (this.props.isMobile) {
      this.props.closeMobileSearch();
    }
  }

  onCloseButtonClick = () => {
    if (this.props.searchValue && this.props.searchValue.length > 0) {
      this.props.onChange(null, { newValue: '' });
    }
    if (this.props.isMobile) {
      this.props.closeMobileSearch();
    }
  };

  render() {
    const inputProps = {
      placeholder: this.placeholder,
      value: this.props.searchValue,
      onChange: this.props.onChange,
      onFocus: (e) => { e.target.placeholder = ''; },
      onBlur: (e) => { e.target.placeholder = this.placeholder; },
    };

    const isValueNotEmpty = this.props.searchValue && this.props.searchValue.length > 0;

    return (
      <Autosuggest
        suggestions={this.props.searchSuggestions}
        multiSection
        onSuggestionsFetchRequested={this.debouncedLoadSuggestions}
        onSuggestionsClearRequested={this.props.onSuggestionsClearRequested}
        getSuggestionValue={HeaderSearchForm.getSuggestionValue}
        renderSuggestion={HeaderSearchForm.renderSuggestion}
        renderSectionTitle={HeaderSearchForm.renderSectionTitle}
        getSectionSuggestions={HeaderSearchForm.getSectionSuggestions}
        onSuggestionSelected={(event, { suggestion }) => {
          this.onSuggestionSelected(suggestion);
        }}
        renderInputComponent={inputCustomProps => (
          <div className={classNames('header-search-form__search-input-container', { 'header-search-form__search-input-container_is-home': this.props.isHome })}>
            <div className={classNames('header-search-form__search-input-container-icon-container', { 'header-search-form__search-input-container-icon-container_white': this.props.whiteBorder })}>
              <SearchIcon
                className="header-search-form__search-input-container-icon"
                alt=""
              />
            </div>
            { (isValueNotEmpty || this.props.isMobile) &&
              <div className={classNames('header-search-form__search-input-container-icon-container header-search-form__search-input-container-icon-container_is-right', { 'header-search-form__search-input-container-icon-container_white': this.props.whiteBorder })}>
                <button className="header-search-form__search-input-container-button" onClick={this.onCloseButtonClick} >
                  <CloseIcon
                    className="header-search-form__search-input-container-icon"
                    alt=""
                  />
                </button>
              </div>
            }
            <input {...inputCustomProps} />
          </div>
        )}
        inputProps={inputProps}
        theme={{
          container: `header-search-form__autosuggest-container ${this.props.isMobile ? 'header-search-form__autosuggest-container_is-mobile' : ''}`,
          containerOpen: 'header-search-form__autosuggest-container_open',
          inputOpen: 'header-search-form__autosuggest-input_open',
          inputFocused: 'header-search-form__autosuggest-input_focused',
          suggestionsContainer: 'header-search-form__autosuggest-suggestions-container',
          suggestionsContainerOpen: `header-search-form__autosuggest-suggestions-container_open
                    ${this.props.isHome && 'header-search-form__autosuggest-suggestions-container_open_is-home'}
                  `,
          suggestionsList: 'header-search-form__autosuggest-suggestions-list',
          suggestion: 'header-search-form__autosuggest-suggestion',
          suggestionFirst: 'header-search-form__autosuggest-suggestion_first',
          suggestionHighlighted: 'header-search-form__autosuggest-suggestion_highlighted',
          sectionContainer: 'header-search-form__autosuggest-section-container',
          sectionContainerFirst: 'header-search-form__autosuggest-section-container_first',
          sectionTitle: 'header-search-form__autosuggest-section-title',
          input: `header-search-form__autosuggest-input
                    ${this.props.transparent && 'header-search-form__autosuggest-input_transparent'}
                    ${this.props.whiteBorder && 'header-search-form__autosuggest-input_white-border'}
                    ${this.props.textCenter && 'header-search-form__autosuggest-input_text-center'}
                  `,
        }}
      />
    );
  }
}

HeaderSearchForm.propTypes = {
  transparent: PropTypes.bool,
  whiteBorder: PropTypes.bool,
  textCenter: PropTypes.bool,
  isHome: PropTypes.bool,
  isMobile: PropTypes.bool,
  searchValue: PropTypes.string,
  searchSuggestions: PropTypes.arrayOf(PropTypes.shape({})),
  // isSuggestionsLoading: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onSuggestionsFetchRequested: PropTypes.func.isRequired,
  onSuggestionsClearRequested: PropTypes.func.isRequired,
  closeMobileSearch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

HeaderSearchForm.defaultProps = {
  transparent: false,
  whiteBorder: false,
  textCenter: false,
};

function mapStateToProps(state) {
  return {
    searchValue: state.search.value,
    searchSuggestions: state.search.suggestions,
    isSuggestionsLoading: state.search.isLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onChange(event, { newValue }) {
      dispatch(updateInputValue(newValue));
    },
    onSuggestionsFetchRequested({ value }) {
      if (value.length <= 1) {
        return;
      }
      dispatch(loadSuggestions(value));
    },
    onSuggestionsClearRequested() {
      dispatch(clearSuggestions());
    },
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderSearchForm));
