class ArrayService<T> {
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
}

export default new ArrayService();
