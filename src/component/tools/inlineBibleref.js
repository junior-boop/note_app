/**
 * Build styles
 */
import './inlineBibleRef.css';
const IconInlineBibleRef = `<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24"><path fill="currentColor" d="M13.341 4A6 6 0 0 0 21 11.659V21a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zM19 10a4 4 0 1 1 0-8a4 4 0 0 1 0 8"/></svg>`

/**
* Inline Code Tool for the Editor.js
*
* Allows to wrap inline fragment and style it somehow.
*/
export default class InlineBibleRef {
    /**
     * Class name for term-tag
     *
     * @type {string}
     */
    static get CSS() {
    return 'inline-code';
    }

    /**
     * @param {{api}}
     */
    constructor({api}) {
    this.api = api;

    /**
    * Toolbar Button
    *
    * @type {HTMLElement|null}
    */
    this.button = null;

    /**
    * Tag represented the term
    *
    * @type {string}
    */
    this.tag = 'CODE';

    /**
    * CSS classes
    */
    this.iconClasses = {
        base: this.api.styles.inlineToolButton,
        active: this.api.styles.inlineToolButtonActive
    };
    }

    /**
     * Specifies Tool as Inline Toolbar Tool
     *
     * @return {boolean}
     */
    static get isInline() {
        return true;
    }

    /**
     * Create button element for Toolbar
     *
     * @return {HTMLElement}
     */
    render() {
        this.button = document.createElement('button');
        this.button.type = 'button';
        this.button.classList.add(this.iconClasses.base);
        this.button.innerHTML = this.toolboxIcon;

        return this.button;
    }

    /**
     * Wrap/Unwrap selected fragment
     *
     * @param {Range} range - selected fragment
     */
    surround(range) {
    if (!range) {
        return;
    }

    let termWrapper = this.api.selection.findParentTag(this.tag, InlineBibleRef.CSS);

    /**
    * If start or end of selection is in the highlighted block
    */
    if (termWrapper) {
            this.unwrap(termWrapper);
        } else {
            this.wrap(range);
        }
    }

 /**
  * Wrap selection with term-tag
  *
  * @param {Range} range - selected fragment
  */
    wrap(range) {
        /**
        * Create a wrapper for highlighting
        */
        let span = document.createElement(this.tag);

        span.classList.add(InlineBibleRef.CSS);

        /**
        * SurroundContent throws an error if the Range splits a non-Text node with only one of its boundary points
        * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Range/surroundContents}
        *
        * // range.surroundContents(span);
        */
        span.appendChild(range.extractContents());
        range.insertNode(span);

        /**
        * Expand (add) selection to highlighted block
        */
        this.api.selection.expandToTag(span);
    }

 /**
  * Unwrap term-tag
  *
  * @param {HTMLElement} termWrapper - term wrapper tag
  */
 unwrap(termWrapper) {
   /**
    * Expand selection to all term-tag
    */
   this.api.selection.expandToTag(termWrapper);

   let sel = window.getSelection();
   let range = sel.getRangeAt(0);

   let unwrappedContent = range.extractContents();

   /**
    * Remove empty term-tag
    */
   termWrapper.parentNode.removeChild(termWrapper);

   /**
    * Insert extracted content
    */
   range.insertNode(unwrappedContent);

   /**
    * Restore selection
    */
   sel.removeAllRanges();
   sel.addRange(range);
 }

 /**
  * Check and change Term's state for current selection
  */
 checkState() {
   const termTag = this.api.selection.findParentTag(this.tag, InlineBibleRef.CSS);

   this.button.classList.toggle(this.iconClasses.active, !!termTag);
 }

 /**
  * Get Tool icon's SVG
  * @return {string}
  */
    get toolboxIcon() {
        return IconInlineBibleRef;
    }

 /**
  * Sanitizer rule
  * @return {{span: {class: string}}}
  */
 static get sanitize() {
   return {
     code: {
       class: InlineBibleRef.CSS
     }
   };
 }
}