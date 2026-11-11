// Lỗi từ .unwrap() của RTK Query có dạng { status, data } hoặc { message }
export function getErrorMessage(err: unknown): string {
  if (typeof err === 'object' && err !== null) {
    if ('data' in err) {
      const data = (err as { data?: { error?: string } }).data;
      if (data?.error) return data.error;
    }
    if ('message' in err && typeof (err as { message: unknown }).message === 'string') {
      return (err as { message: string }).message;
    }
  }
  return 'Đã xảy ra lỗi, vui lòng thử lại';
}
