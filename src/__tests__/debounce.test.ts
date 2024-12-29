import { debounce } from "utils";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  test('delays the execution of the provided function', () => {
    const func = vi.fn();
    const debouncedFunc = debounce(func, 1000);

    debouncedFunc('arg1', 'arg2');
    expect(func).not.toHaveBeenCalled();

    vi.advanceTimersByTime(500);
    expect(func).not.toHaveBeenCalled();

    vi.advanceTimersByTime(500);
    expect(func).toHaveBeenCalledWith('arg1', 'arg2');
    expect(func).toHaveBeenCalledTimes(1);
  });

  test('resets the delay if called again within the delay period', () => {
    const func = vi.fn();
    const debouncedFunc = debounce(func, 1000);

    debouncedFunc('arg1');
    vi.advanceTimersByTime(500);
    debouncedFunc('arg2');
    vi.advanceTimersByTime(500);
    expect(func).not.toHaveBeenCalled();

    vi.advanceTimersByTime(500);
    expect(func).toHaveBeenCalledWith('arg2');
    expect(func).toHaveBeenCalledTimes(1);
  });
});

