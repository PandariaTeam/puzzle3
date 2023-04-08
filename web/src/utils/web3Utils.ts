export const isScroll = window.location.host === 'scroll-alpha.puzzle3.cc';
export const chainId = isScroll ? '82751' : '0xaa36a7';
export const contractAddress = isScroll
  ? '0xA511432602607a566d3C5603Dcb30FfEE0C2b996'
  : '0x1a86339ad7fBB50F753A0Eb44B0FdfD4BC931A44';
