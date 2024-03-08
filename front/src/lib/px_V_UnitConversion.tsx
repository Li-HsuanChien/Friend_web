
export function pxToVW(length: number){
  return (length/ window.innerWidth) * 100;
}

export function pxToVH(length: number){
  return (length/ window.innerHeight) * 100;
}

export function vhToPx(VH: number){
  return (VH / 100) * window.innerHeight;
}

export function vwToPx(VW: number){
  return (VW / 100) * window.innerWidth;
}
