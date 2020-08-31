## 部署

## 测试
```bash

#指定钞票的冠字号，<CB = center bank, 数额, 序号>  
tw-eth-cli utils -m fromAscii -p "CB_100_0001"
> "0x43425f3130305f30303031"
tw-eth-cli utils -m fromAscii -p "CB_100_0002"
> "0x43425f3130305f30303032"

# 发币，注意在node1上已经发布过了，所以你需要换一个冠字号
tw-eth-cli callContract -m mint -p 0xed9d02e382b34818e88B88a309c7fe71E65f419d,0x43425f3130305f30303033
tw-eth-cli callContract -m mint -p 0xed9d02e382b34818e88B88a309c7fe71E65f419d,0x43425f3130305f30303032

#命令行暂时不支持批量发币和转移
#tw-eth-cli callContract -m mintBatch -p 0xed9d02e382b34818e88B88a309c7fe71E65f419d,[0x43425f3130305f30303033,0x43425f3130305f30303032]

# 由于每个冠字号只能发一张，所以余额永远是1，可以理解为非同质化代币
tw-eth-cli callContractReturnValue -m balanceOf -p 0xed9d02e382b34818e88B88a309c7fe71E65f419d,0x43425f3130305f30303032

# 转移币
tw-eth-cli callContract -m safeTransferFrom -p 0xed9d02e382b34818e88B88a309c7fe71E65f419d,0x79F05947C104351D2e819c1e021EFD622D8F40b9,0x43425f3130305f30303032

# 查看转移后的余额
tw-eth-cli callContractReturnValue -m balanceOf -p 0x79F05947C104351D2e819c1e021EFD622D8F40b9,0x43425f3130305f30303032
tw-eth-cli callContractReturnValue -m balanceOf -p 0xed9d02e382b34818e88B88a309c7fe71E65f419d,0x43425f3130305f30303032
```

## tw-eth-cli 配置

在家目录下增加`tw-eth-cli-config.js `

增加以下内容
```js
module.exports = {
    // my local node
    fromAddress: "0xed9d02e382b34818e88B88a309c7fe71E65f419d",
    fromAddressPK: "0xe6181caaffff94a09d7e332fc8da9884d99902c7874eb74354bdcadf411929f1",
    contractAddress: "0x6B5AE192E2162E4C92CB306a2Fb6c0c6CC05FA7a",
    url: "http://node1.quorum.cn.blockchain.thoughtworks.cn:80",
    money: "8.8",
    gasPrice:0,
    gasLimit:327288,
    "abi": "truffle build"
}; 

```
