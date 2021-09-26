<template>
    <div class="big_box">
        <div class="top">
            <p class="title">Factory Emission</p>
            <p class="change_color">/</p>
            <p class="change_color">Emission History</p>
        </div>
        <div class="content_box">
            <div class="top_title">
                <p class="title">Emission History</p>
                <div class="export">
                    <p class="export_icon"></p>
                    <p class="export_text">Table Export</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    
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
        // .title::after {
        //     content: "";
        //     display: block;
        //     width: 30px;
        //     height: 2px;
        //     position: absolute;
        //     bottom: -5px;
        //     left: 0;
        //     background: #11435C;
        //     opacity: 0.12;
        // }
        .change_color {
            color: #999999;
            margin-left: 15px;
            font-size: 14px;
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
            .export {
                display: flex;
                align-items: center;
                cursor: pointer;
                .export_icon {
                    width: 14px;
                    height: 14px;
                    background: url("../../../assets/images/Vector.svg") no-repeat center;
                    background-size: cover;
                    // color: #006D80;
                }
                .export_text {
                    color: #006D80;
                    font-size: 14px;
                    margin-left: 10px;
                }
            }
        }
    }
}
</style>