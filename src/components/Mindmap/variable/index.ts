import * as d3 from '../d3'
import { TwoNumber } from '../interface'
import emitter from '@/mitt'
import { Ref, ref } from 'vue'
import { onZoomMove } from '../feature'
import * as selection from './selection'
import * as element from './element'

export * as ctm from './contextmenu'
export { selection, element }

// 连线样式
type CurveStepLink = ({ source, target }: { source: TwoNumber, target: TwoNumber }) => string | null
type Link = d3.Link<unknown, d3.DefaultLinkObject, [number, number]> | CurveStepLink

const linkHorizontal = d3.linkHorizontal().source((d) => d.source).target((d) => d.target)
const curveStepLine = d3.line().curve(d3.curveStep)

export const curveStepLink: CurveStepLink = ({ source, target }) => curveStepLine([source, target])
export let sharpCorner = false
export let link: Link = linkHorizontal
emitter.on<boolean>('sharp-corner', (value) => {
  sharpCorner = !!value
  link = value ? curveStepLink : linkHorizontal
})

// 连线宽度
export let branch = 4
emitter.on<number>('branch', (value) => branch = value || branch)

// 缩放程度
export let scaleExtent: TwoNumber = [0.1, 8]
emitter.on<TwoNumber>('scale-extent', (value) => scaleExtent = value || scaleExtent)

// 可编辑指示
export let editFlag = false
emitter.on<boolean>('edit-flag', (val) => editFlag = !!val)

// 节点边距与间隔
export const rootTextRectRadius = 6
export const rootTextRectPadding = 10
export let yGap = 18
export let xGap = 84
export let textRectPadding = Math.min(yGap / 2 - 1, rootTextRectPadding)
emitter.on<{ xGap: number, yGap: number}>('gap', (gap) => {
  if (!gap) { return }
  xGap = gap.xGap
  yGap = gap.yGap
  textRectPadding = Math.min(yGap / 2 - 1, rootTextRectPadding)
  textRectPadding = Math.min(xGap / 2 - 1, textRectPadding)
})

// 观察foreign
export const observer = new ResizeObserver((arr: any) => {
  const { foreign } = selection
  if (!foreign) { return }
  const temp = arr[0]
  const target = temp.target
  const pl = parseInt(getComputedStyle(target).paddingLeft || '0', 10)
  const b = parseInt(getComputedStyle(target.parentNode as Element).borderTopWidth || '0', 10)
  const gap = (pl + b) * 2
  foreign.attr('width', temp.contentRect.width + gap).attr('height', temp.contentRect.height + gap)
})

// 其他
export const addBtnRect = { side: 12, padding: 2 }
export const addBtnSide = addBtnRect.side + addBtnRect.padding * 2
export const expandBtnRect = { width: 16, height: 4, radius: 2 }
export const zoomTransform: Ref<d3.ZoomTransform> = ref(d3.zoomIdentity)
export const zoom = d3.zoom<SVGSVGElement, null>().on('zoom', onZoomMove).scaleExtent(scaleExtent)