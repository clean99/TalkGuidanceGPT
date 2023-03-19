import { PrunedElement } from '../types/interface'
import { pruneSpace } from '../utils/utils'
import * as $ from 'jquery'

const mapDOM = (_: number, el: HTMLElement): PrunedElement => {
  const res: PrunedElement = {}
  const $el = $(el) // Cache the jQuery object for better performance
  const prunedRole = pruneSpace($el.attr('role') ?? '')
  const prunedType = pruneSpace($el.attr('type') ?? '')
  const prunedPlaceholder = pruneSpace($el.attr('placeholder') ?? '')
  // @ts-ignore
  const prunedName = pruneSpace($el.text().trim() || el.innerText || '')
  const prunedAlt = pruneSpace($el.attr('alt') ?? '') // Use jQuery's attr method to get the alt attribute
  const prunedTitle = pruneSpace($el.attr('title') ?? '') // Use jQuery's attr method to get the title attribute

  if (prunedRole) {
    res.role = prunedRole
  }

  if (prunedType) {
    res.type = prunedType
  }

  if (prunedPlaceholder) {
    res.placeholder = prunedPlaceholder
  }

  if (prunedName) {
    res.name = prunedName
  }

  if (prunedAlt) {
    res.alt = prunedAlt
  }

  if (prunedTitle) {
    res.title = prunedTitle
  }

  return res
}


export { mapDOM }
