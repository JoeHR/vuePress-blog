## 冒泡排序

冒泡排序（Bubble Sort）也是一种简单直观的排序算法。它重复地走访过要排序的数列，一次比较两个元素，如果他们的顺序错误就把他们交换过来。走访数列的工作是重复地进行直到没有再需要交换，也就是说该数列已经排序完成。这个算法的名字由来是因为越小的元素会经由交换慢慢“浮”到数列的顶端。

作为最简单的排序算法之一，冒泡排序给我的感觉就像 Abandon 在单词书里出现的感觉一样，每次都在第一页第一位，所以最熟悉。冒泡排序还有一种优化算法，就是立一个 flag，当在一趟序列遍历中元素没有发生交换，则证明该序列已经有序。但这种改进对于提升性能来说并没有什么太大作用。

冒泡排序在输入的数据已经是正序时最快，输入的数据是反序时最慢

> 算法步骤

- 1、比较相邻的元素。如果第一个比第二个大，就交换他们两个。
- 2、对每一对相邻元素做同样的工作，从开始第一对到结尾的最后一对。这部做完后，最后的元素会是最大的数
- 3、针对所有的元素重复以上的步骤，除了最后一个
- 4、持续每次对越来越少的元素重复上面的步骤，直到没有任何一堆数字需要比较

```javascript
function  bubbleSort(arr){
    let len = arr.length
    for(let i=0;i<len-1;i++){
        for(let j=0;j<len-1-i;j++){
            if(arr[j]>arr[j+1]){
                const temp = arr[j+1]
                arr[j+1] = arr[j]
                arr[j] = temp
            }
        }
    }
    return arr
}
```

![img](../.vuepress/public/img/frontend/mppx.gif)

## 选择排序

选择排序是一种简单直观的排序算法，无论什么数据进去都是 O(n²)的时间复杂度。所以用到它的时候，数据规模越小越好。唯一的好处可能就是不占用额外的内存空间了吧。

> 算法步骤

- 1、首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置
- 2、再从剩余未排序序列中继续寻找最小（大）元素，然后放到已排序序列的末尾
- 3、重复第二步，直到所有元素均排序完毕

```javascript
function selectionSort(arr){
    let len = arr.length
    let minIndex,temp;
    for(let i=0;i<len-1;i++){
        minIdex = 1;
        for(let j = i+1;j<len;j++){
            if(arr[j] < arr[minIndex]){	// 寻找最小的数
                minIndex = j			// 将最小数的索引保存
            }
        }
        temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp
    }
    return arr;
}
```

 ![img](../.vuepress/public/img/frontend/xzpx.gif)

## 插入排序

插入排序的代码实现虽然没有冒泡排序那么简单粗暴，但它的原理应该是最容易理解的了，因为只要搭国扑克牌的人都应该能够秒懂。插入排序是一种最简单直观的排序算法，它的工作原理是通过构建有序序列，对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入。

插入排序和冒泡排序一样，也有一种优化算法，叫做拆半插入。

> 算法步骤：

- 1、将第一待排序序列第一个元素看作一个有序序列，把第二个元素到最后一个元素当初是未排序序列。
- 2、从头到尾依次扫描未排序序列，将扫描到的每个元素插入有序序列的适当位置。（如果待插入的元素与有序序列中的某个元素相等，则将待插入元素插入到相等元素的后面）

```javascript
function insertionSort(arr){
    const len = arr.length
    let preIndex,current;
    for(let i=1;i<len;i++){
        preIndex = i-1
        current = arr[i]
        while(preIndex >= 0 && arr[preIndex] > current){
            arr[preIndex+1] = arr[preIndex]
            preIndex--;
        }
        arr[preIndex+1] = current
    }
    return arr
}
```

 ![img](../.vuepress/public/img/frontend/crpx.gif)

## 希尔排序

希尔排序，也称递减增量排序算法，是插入排序的一种更高效的改进版本。但希尔排序是非稳定排序算法。

希尔排序是基于插入排序的一下两点性质而提出改进方法的：

- 插入排序在对几乎已经排好序的数据操作时，效率高，即可以达到线性排序的效率
- 但插入排序一般来说是低效的，因为插入排序每次只能将数据移动一位

希尔排序的基本思想是：先将整个待排序的记录序列分给成若干子序列分别进行直接插入排序，待整个序列中的记录"基本有序"时，再对全体记录进行依次直接插入排序

> 算法步骤

- 1、选择一个增量序列t1,t2,......,tk, 其中 ti > tj,tk = 1
- 2、按增量序列个数k,对序列进行k趟排序、
- 3、每趟排序，根据对应的增量ti，将待排序列分割成若干长度为m的子序列，分别对各子表进行直接插入排序。仅增量因子为1时，整个序列作为一个表来处理，表长度即为整个序列的长度

```javascript
function shellSort(arr){
    let len = arr.length,temp,gap = 1;
    while(gap < len/3) {	// 动态定义间隔
        gap = gap*3 + 1
    }
    for(gap;gap>0;gap = Math.floor(gap/3)){
        for(let i = gap;i<len;i++){
            temp = arr[i]
            for(let j = i - gap;j >= 0 && arr[j] > temp;j -=gap){
                arr[j+gap] = arr[j
            }
            arr[j + gap] = temp
        }
    }
    return arr;
}
```

## 归并排序

归并排序（Merge sort）是建立在归并操作上的一种有效的排序算法。该算法是采用分治法（Divide and Conquer）的一个非常典型的应用。

作为一种典型的分而治之思想的算法应用，归并排序的实现由两种方法：

- 自上而下的递归（所有递归的方法都可以用迭代重写，所以就有了第 2 种方法）；
- 自下而上的迭代；

在《数据结构与算法 JavaScript 描述》中，作者给出了自下而上的迭代方法。但是对于递归法，作者却认为：

> However, it is not possible to do so in JavaScript, as the recursion goes too deep for the language to handle.
>
> 然而，在 JavaScript 中这种方式不太可行，因为这个算法的递归深度对它来讲太深了。

说实话，我不太理解这句话。意思是 JavaScript 编译器内存太小，递归太深容易造成内存溢出吗？还望有大神能够指教。

和选择排序一样，归并排序的性能不受输入数据的影响，但表现比选择排序好的多，因为始终都是 O(nlogn) 的时间复杂度。代价是需要额外的内存空间。

> 算法步骤

- 1、申请空间，使其大小为两个已经排序序列之和，该控件用来存放合并后的序列
- 2、设定两个指针，最初位置分别为两个已经排序序列的起始位置
- 3、比较两个指针所指向的元素，选择相对小的元素放入到合并空间，并移动指针到下一位置
- 4、重复步骤3知道某一指针达到序列尾
- 5、将另一序列剩下的所有元素直接复制到合并序列尾

```javascript

function mergeSort(arr){
    let len = arr.length;
    if(len < 2){
        return arr;
    }
    let middle = Math.floor(len/2),
        left = arr.slice(0,middle),
        right = arr.slice(middle);
    return merge(mergeSort(left),mergeSort(right))
}

function merge(left,right){
    let result = [];
    while(left.length && right.length){
        if(left[0] <= right[0]){
            result.push(left.shift())
        }else{
            result.push(right.shift())
        }
    }

    while(left.length){
        result.push(left.shift());
    }

    while(right.length){
        result.push(right.shift());
    }

    return result;
}
```

![img](../.vuepress/public/img/frontend/gbpx.gif)



## 快速排序

> 算法步骤

- 1、从数列中挑出一个元素，称为“基准”（pivot）
- 2、重新排序数列，所有元素比基准值小的摆放在基准前面，所有元素比基准值大的摆在基准的后面（相同的数可以放到任一边）。在这个分区退出之后，该基准就处于数列的中间位置，这个称为分区（partition）操作
- 3、递归的把小于基准值元素的子序列和大于基准值元素的子数列排序

递归的最底部情形，是数列的大小是零或一，也就是永远都已经被排序好了。虽然一直递归下去，但是这个算法总会退出，因为在每次的迭代中，它至少会把一个元素摆到它最后的位置去。

```javascript
function quickSort(arr,left,right){
    let len = arr.length,
        partitionIndex,
        left = typeof left != 'number' ? 0 : left
    	right = typeof right != 'number' ? len - 1 : right

    if(left < right){
        partitionIndex = partition(arr,left,right)
        quickSort(arr,left,partitionIndex - 1)
        quickSort(arr,partitionIndex + 1,right)
    }
    return arr
}

// 分区操作
function partition(arr,left,right){
    // 设定基准值 pivot
    let pivot = left, index = pivot + 1

    for(let i = index;i<=right;i++){
        if(arr[i] < arr[pivot]){
            swap(arr,i,index)
            index++
        }
    }

    swap(arr,pivot,index-1)
    return index - 1
}

function swap(arr,i,j){
    let temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
}

```

```javascript
function quickSort2(arr,low,high){
    if(low < high){
        let pivot = partition2(arr,low,high)
        quickSort2(arr,low,pivot - 1)
        quickSort2(arr,pivot + 1,high)
    }
    return arr
}

// 分区操作
function partition2(arr,low,high){
    let pivot = arr[low]
    while(low < high){

        while (low < high && arr[high] > pivot){
            --high
        }
        arr[low] = arr[high]

        while(low < high && arr[low] <= pivot){
            ++low
        }
        arr[high] = arr[low]
    }
    arr[low] = pivot
    return low
}
```

 ![img](../.vuepress/public/img/frontend/kspx.gif)

## 堆排序

堆排序（Heapsort) 是指利用堆这种数据结构所设计的一种排序算法。堆积是一个近似完全二叉树的结构，并同时满足堆积的性质：即子节点的键值或索引总是小于（或者大于）它的父节点。堆排序可以说是一种利用堆的概念来排序的选择排序。分为两种方法：

- 大顶堆： 每个节点的值都大于或者等于其子节点的值，在堆排序算法中用于升序排列
- 小顶堆： 每个节点的值都小于或者等于其子节点的值，在堆排序算法中用于降序排列

> 算法步骤

- 1、将待排序序列构建成一个堆 H[0......n-1]，根据（升序降序需求）选择大顶堆或小顶堆
- 2、把堆首（最大值）和堆尾互换
- 3、把堆的尺寸缩小1，并调用 shift_down（0），目的是把新的数组顶端数据调整到相应位置；
- 4、重复步骤二，直到堆的尺寸为1

```javascript

function heapSort(arr){
    buildMaxHeap(arr)

    for(let i=arr.length-1;i>0;i--){
        swap(arr,0,i);
        len--;
        heapify(arr,0)
    }
    return arr
}

// 建立最大堆
function buildMaxHeap(arr){
    let len = arr.length
    for(let i = Math.floor(len/2);i>0;i--){
        heapify(arr,i)
    }
}

// 堆调整
function heapify(arr,i){
    let left = 2*i + 1,
        right = 2*i + 2,
        largest = i,
        len = arr.length;

    if(left < len && arr[left] > arr[largest]){
        largest = left
    }

    if(right < len && arr[right] > arr[largest]){
        largest = right
    }

    if(largest != i){
        swap(arr,i,largest);
        heapify(arr,largest)
    }
}

function swap(arr,i,j){
    let temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
}
```

 ![img](../.vuepress/public/img/frontend/dpx.gif)

## 计数排序

计数排序的核心在于将输入的数据值转为为键存储在额外开辟的数组空间中。作为一种线性时间复杂度的排序，技术排序要求输入的数据必须是有确定范围的整数

```javascript
function countingSort(arr,maxValue){
    let bucket = new Array(maxValue+1),
        sortedIndex = 0,
        arrlen = arr.length,
        bucketlen = maxValue + 1;

    for(let i=0;i<arrlen;i++){
        if(!bucket[arr[i]]){
            bucket[arr[i]] = 0
        }
        bucket[arr[i]]++
    }

    for(let j=0;j<bucketlen;j++){
        while(bucket[j] > 0){
            arr[sortedIndex++] = j
            bucket[j]--;
        }
    }

    return arr
}
```

 ![img](../.vuepress/public/img/frontend/jspx.gif)


 <Vssue title="Vssue Demo" />
