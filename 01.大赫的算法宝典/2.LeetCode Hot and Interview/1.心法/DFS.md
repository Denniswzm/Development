[TOC]

# DFS

- **DFS 是否有返回值**：
  - 如果需要**遍历整颗树**，递归函数就**不能有返回值**。
  - 如果需要遍历**某一条固定路线**，递归函数就**一定要有返回值**！
- DFS (boolean)：
  - 当前状态 + 未来状态 `dfs()` **同时为真时** （LeetCode 139）
- 数组记录 `visited` 速度更快（LeetCode 1306）
- 在 `backtracking` 时，进入下一层，是 `i + 1`，而**不是** `start + 1`
- [DFS LeetCode讲解](https://leetcode-cn.com/problems/permutations/solution/hui-su-suan-fa-python-dai-ma-java-dai-ma-by-liweiw/)

# 回溯

- 步骤

  1. 路径：也就是已经做出的选择。
  2. 选择列表：也就是你当前可以做的选择。
  3. 结束条件：也就是到达决策树底层，无法再做选择的条件。

- ```java
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


## 组合

- ```java
  // 组合 Combination
  class Solution {
  
      List<List<Integer>> result = new ArrayList<>();
  
      public List<List<Integer>> subsetsWithDup(int[] nums) {
          // 路径
          List<Integer> track = new ArrayList<>();
          // 排序！
          Arrays.sort(nums);
          // DFS
          dfs(nums, 0, track);
          
          return result;
      }
  
      private void dfs(int[] nums, int start, List<Integer> track){
          // 加入result
          result.add(new ArrayList<>(track));
          
  		// backtrack
          for(int i = start; i < nums.length; i++){
              // 去重; 去重的是同一层的元素；下一层如果数组中有相同的数字是不影响的
              if(i > start && nums[i] == nums[i - 1]){
                  continue;
              }
              track.add(nums[i]);
              dfs(nums, i + 1, track);
              track.remove(track.size() - 1);
          }
    }
  }
  ```
  

## 全排列

- ```java
  // 全排列 Permutation
  class Solution {
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
}
  ```
  



## 回溯算法与深度优先遍历

- 以下是维基百科中「回溯算法」和「深度优先遍历」的定义。
- 回溯法 采用试错的思想，它尝试分步的去解决一个问题。在分步解决问题的过程中，当它通过尝试发现现有的分步答案不能得到有效的正确的解答的时候，它将取消上一步甚至是上几步的计算，再通过其它的可能的分步解答再次尝试寻找问题的答案。回溯法通常用最简单的递归方法来实现，在反复重复上述的步骤后可能出现两种情况：
  - 找到一个可能存在的正确的答案；
  - 在尝试了所有可能的分步方法后宣告该问题没有答案。
- 深度优先搜索 算法（英语：Depth-First-Search，DFS）是一种用于遍历或搜索树或图的算法。这个算法会 尽可能深 的搜索树的分支。当结点 v 的所在边都己被探寻过，搜索将 回溯 到发现结点 v 的那条边的起始结点。这一过程一直进行到已发现从源结点可达的所有结点为止。如果还存在未被发现的结点，则选择其中一个作为源结点并重复以上过程，整个进程反复进行直到所有结点都被访问为止。
- 我刚开始学习「回溯算法」的时候觉得很抽象，一直不能理解为什么递归之后需要做和递归之前相同的逆向操作，在做了很多相关的问题以后，我发现其实「回溯算法」与「 深度优先遍历 」有着千丝万缕的联系。

### 个人理解

- 「回溯算法」与「深度优先遍历」都有「不撞南墙不回头」的意思。我个人的理解是：「回溯算法」强调了「深度优先遍历」思想的用途，用一个 不断变化 的变量，在尝试各种可能的过程中，搜索需要的结果。强调了 回退 操作对于搜索的合理性。而「深度优先遍历」强调一种遍历的思想，与之对应的遍历思想是「广度优先遍历」。至于广度优先遍历为什么没有成为强大的搜索算法，我们在题解后面会提。
- 在「力扣」第 51 题的题解《回溯算法（第 46 题 + 剪枝）》 中，展示了如何使用回溯算法搜索 44 皇后问题的一个解，相信对大家直观地理解「回溯算法」是有帮助。

### 搜索与遍历

- 我们每天使用的搜索引擎帮助我们在庞大的互联网上搜索信息。搜索引擎的「搜索」和「回溯搜索」算法里「搜索」的意思是一样的。
- 搜索问题的解，可以通过 遍历 实现。所以很多教程把「回溯算法」称为爆搜（暴力解法）。因此回溯算法用于 搜索一个问题的所有的解 ，通过深度优先遍历的思想实现。

### 与动态规划的区别

#### 共同点

- 用于求解多阶段决策问题。多阶段决策问题即：
  - 求解一个问题分为很多步骤（阶段）；
  - 每一个步骤（阶段）可以有多种选择。

#### 不同点

- 动态规划只需要求我们评估最优解是多少，最优解对应的具体解是什么并不要求。因此很适合应用于评估一个方案的效果；
  回溯算法可以搜索得到所有的方案（当然包括最优解），但是本质上它是一种遍历算法，时间复杂度很高。

### 从全排列问题开始理解回溯算法

- 我们尝试在纸上写 33 个数字、44 个数字、55 个数字的全排列，相信不难找到这样的方法。以数组 [1, 2, 3] 的全排列为例。
  - 先写以 11 开头的全排列，它们是：[1, 2, 3], [1, 3, 2]，即 1 + [2, 3] 的全排列（注意：递归结构体现在这里）；
  - 再写以 22 开头的全排列，它们是：[2, 1, 3], [2, 3, 1]，即 2 + [1, 3] 的全排列；
  - 最后写以 33 开头的全排列，它们是：[3, 1, 2], [3, 2, 1]，即 3 + [1, 2] 的全排列。
- 总结搜索的方法：按顺序枚举每一位可能出现的情况，已经选择的数字在 当前 要选择的数字中不能出现。按照这种策略搜索就能够做到 不重不漏。这样的思路，可以用一个树形结构表示。

# 岛屿问题遍历框架

- **DFS/BFS 算法遍历二维数组**

- ```java
  // 二叉树遍历框架
  void traverse(TreeNode root) {
      traverse(root.left);
      traverse(root.right);
  }
  
  // 二维矩阵遍历框架
  void dfs(int[][] grid, int i, int j, boolean[] visited) {
      int m = grid.length, n = grid[0].length;
      if (i < 0 || j < 0 || i >= m || j >= n) {
          // 超出索引边界
          return;
      }
      if (visited[i][j]) {
          // 已遍历过 (i, j)
          return;
      }
      // 进入节点 (i, j)
      visited[i][j] = true;
      dfs(grid, i - 1, j); // 上
      dfs(grid, i + 1, j); // 下
      dfs(grid, i, j - 1); // 左
      dfs(grid, i, j + 1); // 右
  }
  ```

### 使用【方向数组】

- ```java
  // 方向数组，分别代表上、下、左、右
  int[][] dirs = new int[][]{{-1,0}, {1,0}, {0,-1}, {0,1}};
  
  void dfs(int[][] grid, int i, int j, boolean[] visited) {
      int m = grid.length, n = grid[0].length;
      if (i < 0 || j < 0 || i >= m || j >= n) {
          // 超出索引边界
          return;
      }
      if (visited[i][j]) {
          // 已遍历过 (i, j)
          return;
      }
  
      // 进入节点 (i, j)
      visited[i][j] = true;
      // 递归遍历上下左右的节点
      for (int[] d : dirs) {
          int next_i = i + d[0];
          int next_j = j + d[1];
          dfs(grid, next_i, next_j);
      }
      // 离开节点 (i, j)
  }
  ```

# 字符串分割模板

- 131

- ```java
  class Solution {
      public List<List<String>> partition(String s) {
          // 准备工作
          List<List<String>> result = new ArrayList<>();
          List<String> path = new ArrayList<>();
  
          // DFS
          dfs(s, 0, path, result);
  
          return result;
      }
  
      private void dfs(String s, int index, List<String> path, List<List<String>> result){
          // 递归出口
          if(index == s.length()){
              result.add(new ArrayList<>(path));
              return;
          }
  
          // DFS
          // index = left, i = right
          for(int i = index; i < s.length(); i++){
              // 判断回文
              if(!isPalindrome(s, index, i)){
                  continue;
              }
  
              // backtracking
              // i: 当前选取字符串的右端点; 截取 [index, i]
              path.add(s.substring(index, i + 1));
              dfs(s, i + 1, path, result);
              path.remove(path.size() - 1);
          }
      }
  
      private boolean isPalindrome(String s, int left, int right){
          while(left < right){
              if(s.charAt(left) != s.charAt(right)){
                  return false;
              }
              left++;
              right--;
          }
          return true;
      }
  }
  ```

- 