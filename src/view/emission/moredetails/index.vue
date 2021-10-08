<template>
    <div class="big_box">
        <div class="top">
            <p class="title"  @click="goBack(-2)">Factory Emission</p>
            <p class="title add_margin">/</p>
            <p class="title add_margin"  @click="goBack(-1)">Emission History</p>
            <p class="change_color">/</p>
            <p class="change_color">More Details</p>
        </div>
        <div class="content_box">
            <div class="top_title">
                <p class="title">Emission History</p>
            </div>
            <div class="top_content">
                <div class="left_content">
                    <p class="name">{{detailData.product_name}}</p>
                    <p class="acount">Total PCF value：{{detailData.pcf_total}}kg CO2e</p>
                    <ul class="bottom_list">
                        <li>
                            <p>Product ID:{{detailData.product_id}}</p>
                        </li>
                        <li>
                            <p>Serial No:{{detailData.serial}}</p>
                        </li>
                        <li>
                            <p>Weight:{{detailData.weight}}</p>
                        </li>
                        <li>
                            <p>Cost Per Piece:{{detailData.cost}}</p>
                        </li>
                    </ul>
                </div>
                <div class="right_content">
                    <img :src="detailData.image_url" alt="">
                </div>
            </div>
        </div>
        <div class="content_box">
            <div class="top_title">
                <p class="title">Specific PCS Value</p>
            </div>
            <div class="center_cont">
                <div class="cont_title">
                    <p class="icon_img"></p>
                    <p class="icon_right">
                        <span>Scope 1&2：</span>
                        <span class="add_weight">{{detailData.pcf_scope12.public+detailData.pcf_scope12.smt+detailData.pcf_scope12.tht+detailData.pcf_scope12.assembling}}kg</span>
                        <span>CO2e</span>
                    </p>
                </div>
                <ul class="ul_list">
                    <li v-for="(item,index) in list" :key="index" :class="'list_li list_li'+index">
                        <p>{{item.name}}：</p>
                        <p><span class="num">{{item.num}}kg</span> CO2e</p>
                    </li>
                </ul>
            </div>
            <div class="center_cont bottom_cont">
                <div class="top_con">
                    <div class="cont_title">
                        <p class="icon_img"></p>
                        <p class="icon_right">
                            <span>Scope 3：</span>
                            <span class="add_weight">{{scope3Total}}kg</span>
                            <span>CO2e</span>
                        </p>
                    </div>
                    <Button type="text" size="small" @click="gotoValus">Load More</Button>
                </div>
                <div class="ul_list2">
                    <ul>
                        <li v-for="(item,index) in detailData.pcf_scope3" :key="index">
                            <div class="left">
                                <img :src="item.image_url" alt="">
                            </div>
                            <div class="right">
                                <p class="name">{{item.material_name}}</p>
                                <p class="number">{{item.pcf}}</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {getDetails} from "@/api/home"
export default {
    data() {
        return {
            list:[
                {name:"SMT",num:''},
                {name:"THT",num:''},
                {name:"Assembling",num:''},
                {name:"Public utilities",num:''},
            ],
            list2:[
                {name:"SMT",num:'0.1kg'},
                {name:"SMT",num:'0.1kg'},
                {name:"SMT",num:'0.1kg'},
                {name:"SMT",num:'0.1kg'},
                {name:"SMT",num:'0.1kg'},
                {name:"SMT",num:'0.1kg'},
            ],
            detailData:{
                "product_id": "123123",
                "product_name": "123123aqaaa",
                "serial": "123132",
                "image_url": "null",
                "location": "asd",
                "weight": 0,
                "cost": 0,
                "pcf_total": 0,
                "pcf_scope12": {
                "public": 0,
                "smt": 0,
                "tht": 0,
                "assembling": 0
                },
                "pcf_scope3": [
                {
                    "material_id": "asdasd",
                    "material_name": "asdasd",
                    "pcf": 0,
                    "image_url": "null"
                }
                ]

            },
            scope3Total:null
        }
    },
    created(){
        console.log(this.$route,"//");
        var obj = {
            product_id :this.$route.query.id,
            serial :this.$route.query.serial,
        }

        /**
         *   "data": {
                "product_id": "string",
                "product_name": "string",
                "serial": "string",
                "image_url": "string",
                "location": "string",
                "weight": 0,
                "cost": 0,
                "pcf_total": 0,
                "pcf_scope12": {
                "public": 0,
                "smt": 0,
                "tht": 0,
                "assembling": 0
                },
                "pcf_scope3": [
                {
                    "material_id": "string",
                    "material_name": "string",
                    "pcf": 0,
                    "image_url": "string"
                }
                ]
            }
         * 
         * 
         */
        getDetails({...obj}).then(res=>{
            if(res.code == 0) {
                this.detailData = res.data;
                this.list[0].num = res.data.pcf_scope12.smt;
                this.list[1].num = res.data.pcf_scope12.tht;
                this.list[2].num = res.data.pcf_scope12.assembling;
                this.list[3].num = res.data.pcf_scope12.public;
                this.scope3Total = res.data.pcf_scope3.reduce((pre,next)=>{
                    return pre+next
                })
            }
        })
    },
    methods:{
        gotoValus() {
            this.$router.push('/emission/history/pcfvalue/'+this.$route.query.id)
        },
        goBack(steps) {
            this.$router.go(steps)
        }
    }
}
</script>
<style lang="less" scoped>
.big_box {
    .top {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .title {
            font-size: 14px;
            color: #00183C;
            position: relative;
        }
        .add_margin {
            margin-left: 15px;
        }
        .change_color {
            color: #999999;
            margin-left: 15px;
            font-size: 14px;
        }
        p {
            cursor: pointer;
        }
    }
    .content_box {
        padding: 20px;
        background: #fff;
        margin-top: 20px;
        .top_title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .title {
                font-size: 18px;
                color: #11435C;
                position: relative;
            }
            .title::after {
                content: "";
                display: block;
                width: 30px;
                height: 2px;
                position: absolute;
                bottom: -5px;
                left: 0;
                background: #11435C;
                opacity: 0.12;
            }
        }
        .top_content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 20px;
            .left_content {
                .name {
                    color: #11435C;
                    font-size: 36px;
                }
                .acount {
                    margin-top: 20px;
                    font-size: 14px;
                    color: #000000;
                }
                .bottom_list {
                    margin-top: 20px;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    li {
                        margin-right: 15px;
                        p {
                            font-size: 14px;
                            color: #000;
                        }
                    }
                }
            }
            .right_content {
                width: 306px;
                height: 204px;
                background: #EEF1F6;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
        .center_cont {
            margin-top: 30px;
            border-bottom: 1px solid #cdcdcd;
            padding-bottom: 20px;
            .cont_title {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                .icon_img {
                    width: 20px;
                    height: 18px;
                    background: url("../../../assets/images/detail_icon.png") no-repeat center;
                    background-size: cover;
                }
                .icon_right {
                    margin-left: 10px;
                    font-size: 16px;
                    color: #11435C;
                    .add_weight {
                        font-weight: 600;
                    }
                }
            }
            .ul_list {
                display: flex;
                padding-left: 20px;
                justify-content: flex-start;
                align-items: center;
                margin-top: 20px;
                li {
                    display: flex;
                    margin-right: 35px;
                    justify-content: flex-start;
                    align-items: center;
                    position: relative;
                    p {
                        font-size: 14px;
                        color: #000;
                        .num {
                            font-weight: 600;
                        }
                    }
                }
                .list_li::before {
                    content: "";
                    display: block;
                    width: 10px;
                    height: 10px;
                    border-radius: 5px;
                    position: absolute;
                    left: -15px;
                    top: 5px;
                    background: #006D80;
                }
                .list_li1::before {
                     background: #00D3C9;
                }
                .list_li2::before {
                     background: #A4DC94;
                }
                .list_li3::before {
                     background: #FFE898;
                }
            }
        }
        .bottom_cont {
            border-bottom: none;
            .top_con {
                display: flex;
                justify-content: space-between;
                align-items: center;
                .ivu-btn-text {
                    color: #006D80;
                }
                .ivu-btn {
                    outline: none;
                    border: none !important;
                }
                .ivu-btn:hover {
                    background: none;
                    border: none;
                    box-shadow: none;
                }
                .ivu-btn:focus {
                    background: none;
                    border: none;
                    box-shadow: none;
                }
                .ivu-btn:active {
                    background: none;
                    border: none;
                    box-shadow: none;
                }
            }
            .ul_list2 {
                margin-top: 20px;
                ul {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    li {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding:10px;
                        border: 1px solid #cdcdcd;
                        .left {
                            width: 78px;
                            height: 52px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            background: #F3F3F3;
                            margin-right: 10px;
                            img {
                                width: 37px;
                                height: 47px;
                            }
                        }
                        .right {
                            .name {
                                font-size: 14px;
                                color: #000;
                                opacity: 0.6;
                            }
                            .number {
                                font-size: 14px;
                                color: #000;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>