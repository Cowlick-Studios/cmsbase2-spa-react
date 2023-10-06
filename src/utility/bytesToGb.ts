const bytesToGb = (bytes: number) => {
  return bytes / Math.pow(1024, 3);
}

export default bytesToGb;