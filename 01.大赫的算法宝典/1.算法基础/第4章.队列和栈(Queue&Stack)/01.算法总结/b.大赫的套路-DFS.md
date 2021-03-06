# b.大赫的套路-DFS和回溯算法

## 1.DFS模板-递归

```java
/*
 * Return true if there is a path from cur to target.
 */
boolean DFS(Node cur, Node target, Set<Node> visited) {
    if cur is target;
    	return true 
    for (next : each neighbor of cur) {
        if (next is not in visited) {
            add next to visted;
            if DFS(next, target, visited) == true;
            	return true 
        }
    }
    return false;
}
```

## 2.回溯算法模板

1. **路径**：也就是已经做出的选择。
2. **选择列表**：也就是你当前可以做的选择。
3. **结束条件**：也就是到达决策树底层，无法再做选择的条件。

* **解决一个回溯问题，实际上就是一个决策树的遍历过程**
* **其核心就是 for 循环里面的递归，在递归调用之前「做选择」，在递归调用之后「撤销选择」**

```java
result = []
def backtrack(路径, 选择列表):
    if 满足结束条件:
        result.add(路径)
        return

    for 选择 in 选择列表:
        做选择
        backtrack(路径, 选择列表)
        撤销选择
```

* 选择列表：过滤后的**下一个决策**

我们定义的`backtrack`函数其实就像一个指针，在这棵树上游走，同时要正确维护每个节点的属性，每当走到树的底层，其「路径」就是一个全排列

![1](https://raw.githubusercontent.com/TWDH/Leetcode-From-Zero/pictures/img/1.jpg)

* 遍历一棵多叉树

```java
void traverse(TreeNode root) {
    for (TreeNode child : root.childern)
        // 前序遍历需要的操作
        traverse(child);
        // 后序遍历需要的操作
}
```

**而所谓的前序遍历和后序遍历，他们只是两个很有用的时间点**

![2 (2)](https://raw.githubusercontent.com/TWDH/Leetcode-From-Zero/pictures/img/2%20(2).jpg)

* **前序遍历的代码在进入某一个节点之前的那个时间点执行，后序遍历代码在离开某个节点之后的那个时间点执行**

「路径」和「选择」是每个节点的属性，函数在树上游走要正确维护节点的属性，那么就要在这两个特殊时间点搞点动作：

![3](https://raw.githubusercontent.com/TWDH/Leetcode-From-Zero/pictures/img/3.jpg)

```java
for 选择 in 选择列表:
    # 做选择
    1.将该选择从选择列表移除
    2.*路径.add(选择)
        
    3.*backtrack(路径, 选择列表)
        
    # 撤销选择
    4.*路径.remove(选择)
    将该选择再加入选择列表
```

**我们只要在递归之前做出选择，在递归之后撤销刚才的选择**，就能正确得到每个节点的选择列表和路径。

#### 全排列完整代码

```java
List<List<Integer>> res = new LinkedList<>();

/* 主函数，输入一组不重复的数字，返回它们的全排列 */
List<List<Integer>> permute(int[] nums) {
    // 记录「路径」
    LinkedList<Integer> track = new LinkedList<>();
    backtrack(nums, track);
    return res;
}

// 路径：记录在 track 中
// 选择列表：nums 中不存在于 track 的那些元素
// 结束条件：nums 中的元素全都在 track 中出现
void backtrack(int[] nums, LinkedList<Integer> track) {
    // 触发结束条件
    if (track.size() == nums.length) {
        res.add(new LinkedList(track));
        return;
    }

    for (int i = 0; i < nums.length; i++) {
        // 排除不合法的选择
        if (track.contains(nums[i]))
            continue;
        // 做选择
        track.add(nums[i]);
        // 进入下一层决策树
        backtrack(nums, track);
        // 取消选择
        track.removeLast();
    }
}
```

我们这里稍微做了些变通，没有显式记录「选择列表」，而是通过`nums`和`track`推导出当前的选择列表：

![图片](https://mmbiz.qpic.cn/sz_mmbiz_jpg/gibkIz0MVqdF1umAdyXuPq54ibw7X23mnaWuNCGdIXFoeBp1U7IA4tSEz1Pia9VvK2H9mSib1Mch3Yb5V8PCHib8dog/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

* 时间复杂度都**不可能低于 O(N!)**，因为**穷举整棵决策树**是无法避免的