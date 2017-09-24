class ArrayUtil<T> {
  public zip = (...args: T[][]): T[][]  => {
    if (!args.length) {
      return args;
    }

    const shortest = args.reduce((a: T[], b: T[]) => {
      return a.length < b.length ? a : b;
    }, args.slice().shift());

    return shortest.map(
      (_, i: number) => args.map((array: T[]) => array[i])
    );
  }

  public size = (array: any[] = []): number => {
    return array.length;
  }
}

export default new ArrayUtil();
