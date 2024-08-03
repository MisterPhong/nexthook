import { IconButton, styled } from "@mui/material";

export const SquareIconButton = styled(IconButton)(({ theme }) => ({
  border: '1px solid #c5c5c5', // ใส่ border
  borderRadius: 5, // ทำให้เป็นสี่เหลี่ยม
  padding: theme.spacing(2), // ปรับ padding ตามที่ต้องการ
  transition: 'background-color 0.3s, border-color 0.3s', // เพิ่ม transition
  "&:hover": {
    backgroundColor: "#e5e5e5", // เปลี่ยนสีพื้นหลังเมื่อ hover
    borderColor: "#212121", // เปลี่ยนสี border เมื่อ hover
  },
}))