

//date.setTime(date.getTime() + 1000*60*60*9);
function getClassIndex(date) {
    const threshold = 2700000;
    const classRangeTable = [
      [[0, 0, 0], [8, 59, 59]],
      [[9, 10, 0], [9, 54, 59]],
      [[9, 55, 0], [10, 39, 59]],
      [[10, 50, 0], [11, 34, 59]],
      [[11, 35, 0], [12, 19, 59]],
      [[13, 5, 0], [13, 49, 59]],
      [[13, 50, 0], [14, 34, 59]],
      [[14, 45, 0], [15, 29, 59]],
      [[15, 30, 0], [16, 14, 59]],
      [[16, 15, 0], [23, 59, 59]],
    ];
    date.setMilliseconds(0);
    let index = 0;
    for (const range of classRangeTable) {
      const start = new Date(date.getTime());
      start.setHours(range[0][0]);
      start.setMinutes(range[0][1]);
      start.setSeconds(range[0][2]);
      const end = new Date(date.getTime());
      end.setMilliseconds(0);
      end.setHours(range[1][0]);
      end.setMinutes(range[1][1]);
      end.setSeconds(range[1][2]);
      const diffStart = date.getTime() - start.getTime();
      const diffEnd =  end.getTime() - date.getTime();
      console.log(diffStart, diffEnd)
      if (
        diffStart >= 0 &&
        diffEnd >= 0 &&
        diffEnd <= threshold
      ) {
        console.log("unko")
        break;
      }
      index++;
    }
    return index;
  }

const date = new Date(2019, 1, 25, 9, 0, 0);

console.log(getClassIndex(date))