## 部署

## 测试
```bash

# 查询某个地址上面编号为3的货币余额
tw-eth-cli callContractReturnValue -m balanceOf -p 0x4d0A00035357D982e24A87c1ebBaF72BD9420bfd,3

# 转移1个3号货币到目标地址
tw-eth-cli callContract -m safeTransferFrom -p 0x4d0A00035357D982e24A87c1ebBaF72BD9420bfd,0xD12cEaBe4A70111180b810288BF9d2ba1F2dd1Ac,3,1,"0x0123" 

# 查看是否转移成功
tw-eth-cli callContractReturnValue -m balanceOf -p 0xD12cEaBe4A70111180b810288BF9d2ba1F2dd1Ac,3
```


