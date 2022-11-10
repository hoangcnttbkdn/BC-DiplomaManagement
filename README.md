# BC-DiplomaManagement
Hướng dẫn sử dụng
- Link tải máy ảo: 

Config:
  - Máy Windows: 
    + Vào C:\Windows\System32\drivers\etc\ 
    + Thêm '192.168.1.66			orderer.example.com peer0.org1.example.com peer0.org2.example.com' vào file 'hosts'
  - Máy Linux:
    + Run sudo nano /etc/hosts
    + Thêm '192.168.1.66			orderer.example.com peer0.org1.example.com peer0.org2.example.com'
    + save \
    
Clone code ---> Run test: node app.js

ID: Số hiệu văn bằng (duy nhất, tra văn bằng bằng cái này) \
Fullname: họ và tên \
DateOfBirth: ngày sinh \
Certificate: Tên bằng ( đại học, cử nhân,...) \
Speciality: chuyên ngành \
GraduationYear: năm tốt nghiệp \
School: trường: (Đại học Bách Khoa, ...) \
Rank: xếp loại (giỏi, khá, ...) \
ModeOfStudy: hệ (Chính quy, từ xa, ...) \
RegNo: số vào sổ cấp bằng (k33-035,...) \
UrlImage: link hỉnh ảnh của văn bằng 
