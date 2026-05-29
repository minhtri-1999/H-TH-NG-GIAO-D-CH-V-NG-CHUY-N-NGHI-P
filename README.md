# 📈 XAU/USD Gold Terminal - Hướng dẫn chạy dự án

Dự án này là một ứng dụng **Trading Terminal & Tín hiệu giao dịch Vàng (XAU/USD)** thời gian thực vô cùng trực quan và cao cấp, được xây dựng dựa trên công nghệ **Deno + Hono** ở Backend và **React + ES Modules** ở Frontend.

---

## 🚀 Cách chạy dự án nhanh chóng

Do dự án được viết hoàn toàn bằng **Deno** (một runtime Javascript/Typescript hiện đại, bảo mật và cực kỳ nhanh chóng), bạn **không cần cài đặt `node_modules` hay chạy các bước build phức tạp**. Deno sẽ tự động quản lý và tải các thư viện cần thiết.

### Bước 1: Mở Terminal tại thư mục dự án
Bạn mở cửa sổ dòng lệnh (PowerShell, Command Prompt hoặc Terminal trong VS Code) ngay tại thư mục chứa dự án:
```bash
c:\Users\VI TINH ONG DON\Desktop\project update
```

### Bước 2: Chạy lệnh khởi động máy chủ
Nhập lệnh sau và nhấn **Enter**:
```bash
deno run --allow-net --allow-read --allow-write --allow-env --env --unstable-kv main.ts
```

> 💡 **Giải thích các tham số:**
> - `--allow-net`: Cấp quyền cho Deno kết nối Internet để lấy dữ liệu giá Vàng thời gian thực và kết nối SMTP gửi email.
> - `--allow-read`: Cấp quyền cho Deno đọc giao diện tĩnh và các cấu hình dự án.
> - `--allow-write`: Cấp quyền ghi dữ liệu để Deno KV lưu trữ tài khoản người dùng và phiên đăng nhập.
> - `--allow-env`: Cấp quyền đọc biến môi trường để lấy thông tin cấu hình SMTP / Resend.
> - `--env`: Tự động tải các biến cấu hình từ tệp tin `.env` ở thư mục gốc dự án.
> - `--unstable-kv`: Kích hoạt tính năng cơ sở dữ liệu Deno KV được tích hợp sẵn.

### Bước 3: Mở trình duyệt và thưởng thức
Sau khi chạy lệnh trên thành công, màn hình sẽ hiển thị:
```text
Listening on http://localhost:8000/
```
Bây giờ, bạn chỉ cần mở trình duyệt web và truy cập vào đường dẫn:
👉 **[http://localhost:8000/](http://localhost:8000/)**

---

## ⚙️ Cấu hình API Key (Tùy chọn)

Mặc định, ứng dụng có cơ chế **Fallback** thông minh:
1. Đầu tiên, hệ thống sẽ cố gắng gọi dữ liệu trực tiếp từ **RapidAPI (Gold Price XAU/USD API)** nếu bạn cung cấp API Key.
2. Nếu không có API Key hoặc vượt quá giới hạn lượt gọi, hệ thống sẽ tự động chuyển sang sử dụng nguồn dữ liệu thay thế là **Binance API (PAXGUSDT - giá Vàng bảo chứng)** và khớp độ chênh lệch (spread delta) để hiển thị chính xác giá vàng thế giới thời gian thực mà hoàn toàn miễn phí!

Nếu bạn có **RapidAPI Key** và muốn sử dụng dữ liệu chất lượng cao nhất, bạn có thể thiết lập biến môi trường trước khi chạy ứng dụng:

### Trên Windows (PowerShell):
```powershell
$env:RAPIDAPI_KEY="KEY_CUA_BAN_TAI_DAY"
deno run --allow-net --allow-read --allow-write --allow-env --env --unstable-kv main.ts
```

### Trên Windows (CMD):
```cmd
set RAPIDAPI_KEY=KEY_CUA_BAN_TAI_DAY
deno run --allow-net --allow-read --allow-write --allow-env --env --unstable-kv main.ts
```

---

## 🎨 Điểm nổi bật của Dự án
- **Đồ họa mượt mà (Ultra-realtime Ticking):** Nến nhảy liên tục với tần số cao mỗi **85ms** mô phỏng chính xác nhịp đập thị trường.
- **Biểu đồ SMC chuyên sâu:** Tự động xác định các vùng mất cân bằng thanh khoản **FVG (Fair Value Gap)**, vùng khối lệnh **Order Block**, các cấu trúc thị trường **BOS (Break of Structure)** và **CHoCH (Change of Character)**.
- **Phím tắt nhanh (Giống TradingView):**
  - Phím `+` / `-` để Phóng to / Thu nhỏ biểu đồ.
  - Phím `Arrow Left` / `Arrow Right` để cuộn biểu đồ về quá khứ hoặc hiện tại.
  - Phím `R` để reset biểu đồ về trạng thái mặc định.
- **Âm thanh cảnh báo (Audio Alerts):** Phát âm thanh chimes cao cấp khi giá chạm các vùng FVG hoặc Order Block quan trọng (Có thể Bật/Tắt trong giao diện).

Chúc bạn có những trải nghiệm giao dịch và lập trình tuyệt vời nhất với **XAU/USD Gold Terminal**! 📈✨
