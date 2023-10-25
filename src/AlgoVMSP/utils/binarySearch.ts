export function binarySearch<T>(nums: T[], target: T): number {
    let left: number = 0;
    let right: number = nums.length - 1;

    while (left <= right) {
        const mid: number = (left + right) >>> 1;

        if (nums[mid] === target) return mid;
        if (target < nums[mid]) right = mid - 1;
        else left = mid + 1;
    }

    return -(left + 1);
}
