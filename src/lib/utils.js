function toVal(mix) {
  let str = "";
  if (typeof mix === "string" || typeof mix === "number") {
    str += mix;
  } else if (typeof mix === "object") {
    if (Array.isArray(mix)) {
      for (let k = 0; k < mix.length; k++) {
        if (mix[k]) {
          const y = toVal(mix[k]);
          if (y) {
            str && (str += " ");
            str += y;
          }
        }
      }
    } else {
      for (const y in mix) {
        if (mix && mix[y]) {
          str && (str += " ");
          str += y;
        }
      }
    }
  }
  return str;
}

export function clsx(...args) {
  let str = "";
  for (let i = 0; i < args.length; i++) {
    const x = toVal(args[i]);
    if (x) {
      str && (str += " ");
      str += x;
    }
  }
  return str;
}

export function twMerge(...classLists) {
  return classLists.filter(Boolean).join(" ");
}

export function cn(...inputs) {
  return twMerge(clsx(...inputs));
}

export default cn;
