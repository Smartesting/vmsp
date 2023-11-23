# VMSP (Vertical Mining of Sequential Patterns)

This library offers an efficient TypeScript implementation of the VMSP (Vertical Mining of Sequential Patterns) algorithm. VMSP is an algorithm that mines frequent maximal sequential patterns in a database of sequences, proposed by Fournier-Viger et al.(2013). However, this implementation has drifted a bit from the original algorithm, as it is also able to mine closed patterns as well. Hence, VMSP here stands for vertical mining of sequential patterns.


___

### Installation

Install via npm:

```bash
npm i @smartesting/vmsp

```
___

### Input Types

For the `AlgoVMSP` class and its associated methods, here's a breakdown of the types of parameters:

#### 1\. Constructor Parameters:

-   **maxGap**: Number specifying the maximum gap between two items in a pattern. Defaults to `undefined`, which means infinity gaps are allowed.
-   **patternType**: Choose 'closed' or 'maximal' depending on the kind of pattern you're after. Defaults to `maximal`.
-   **minimumPatternLength**: Number specifying the minimum length of a pattern. Defaults to `3`.
-   **maximumPatternLength**: Number specifying the maximum length of a pattern. Defaults to `8`.
-   **outputSequenceIdentifiers**: Boolean indicating if output patterns should include the sequence identifiers that match them. Defaults to `false`.
-   **executionTimeThresholdInSeconds**: Number specifying the maximum execution time in seconds. Expect the real execution time to be ~2seconds longer than the provided value. Defaults to `10`.
-   **debug**: Boolean indicating if debug logs should be printed. Defaults to `false`.

#### 2\. runFromSpmfFile Method:

-   **input**: String specifying the path to the SPMF-formatted input file. Format example: "2 1 -1 3 -1 5 2 8 -1 -2" for the sequence \[2,1\]\[3\]\[5,2,8\].
-   **minsupRel**: Number specifying the relative minimum support \[0-1\].

#### 3\. run Method:

-   **fileLines**: Array of strings where each string is a sequence from the input file.
-   **minsupRel**: Number specifying the relative minimum support \[0-1\].

___

### Output Types

The primary output of this library is a set of patterns, with each pattern consisting of:

1.  **Patterns**: This includes the actual patterns and their support count.
2.  **Bitmap Intersections**: Number of bitmap intersections performed during the algorithm's execution.
3.  **Execution Time**: Elapsed time in milliseconds.

___

### Usage Example

To give a basic overview of how to use the library:

```javascript
import AlgoVMSP from 'vmsp'

// Set options
const options: VMSPOptions = {
  maxGap: 1,
  minPatternLength: 1,
  maxPatternLength: 5
}

// Create an instance of the VMSP algorithm
const vmspInstance = new AlgoVMSP(options)

// Load data from an SPMF file and run the algorithm
const minSup: number = 0.01
const results = vmspInstance.runFromSpmfFile('path_to_input_file.txt', minSup)

vmspInstance.printResult()

```

### References
1. [Documentation](https://www.philippe-fournier-viger.com/spmf/VMSP.php) of VMSP's Java Implementation
2. *Fournier-Viger, P., Wu, C.-W., Gomariz, A. Tseng, V.-S. (2014)*. [VMSP: Efficient Vertical Mining of Maximal Sequential Patterns](https://www.philippe-fournier-viger.com/spmf/VMSP_maximal_sequential_patterns_2014.pdf), Proc. 27th Canadian Conference on Artificial Intelligence (AI 2014), Springer, LNAI, pp. 83-94
