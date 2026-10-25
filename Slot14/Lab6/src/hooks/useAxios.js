
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

/**
 * useAxios - gọi API bằng axios trong useEffect
 *
 * @param {(signal: AbortSignal) => Promise<{data, headers?}>} requestFn
 * @param {Array} deps - Các giá trị mà requestFn phụ thuộc
 * @param {Object} options
 * @param {boolean} options.enabled - Cho phép gọi API hay không
 * @param {*} options.initialData - Dữ liệu ban đầu
 *
 * @returns { data, setData, headers, loading, error, refetch }
 */
export default function useAxios(
  requestFn,
  deps = [],
  { enabled = true, initialData = null } = {}
) {
  const [data, setData] = useState(initialData);
  const [headers, setHeaders] = useState({});
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);
  const [doneKey, setDoneKey] = useState(null);

  // Đại diện cho bộ tham số của request hiện tại
  const key = JSON.stringify([...deps, reloadKey]);

  useEffect(() => {
    if (!enabled) return;

    const controller = new AbortController();

    const run = async () => {
      setError(null);

      try {
        const res = await requestFn(controller.signal);

        setData(res.data);
        setHeaders(res.headers ?? {});
      } catch (err) {
        if (axios.isCancel(err)) return;

        setError(err.userMessage ?? err.message);
      } finally {
        if (!controller.signal.aborted) {
          setDoneKey(key);
        }
      }
    };

    run();

    // Hủy request khi dependencies thay đổi hoặc component unmount
    return () => controller.abort();

    // requestFn tạo mới mỗi lần render nên không đưa vào dependencies.
    // Liệt kê các giá trị requestFn sử dụng trong deps khi gọi hook.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, enabled]);

  // Tính loading ngay khi bộ tham số thay đổi
  const loading = enabled && doneKey !== key;

  // Tải lại dữ liệu khi được yêu cầu
  const refetch = useCallback(() => {
    setReloadKey((current) => current + 1);
  }, []);

  return {
    data,
    setData,
    headers,
    loading,
    error,
    refetch,
  };
}
