# GAS Invoice Generator

GASを使用して自動で請求書を作成するプロトタイプです。

## 概要

このプロジェクトは、Google Apps Script（GAS）を使用して複数店舗の請求書を自動生成・更新するシステムです。

**関連記事**: [Qiitaの記事](https://qiita.com/drafts/9eecca795e9fd56a1427/edit)

## 機能

- **全店舗請求書更新**: `updateAllInvoices()` - すべての店舗の請求書を一括更新
- **請求対象期間更新**: `updateBillingPeriod()` - 請求期間情報を自動更新
- **店舗別請求書更新**: `updateStoreA()`, `updateStoreB()` - 店舗ごとの請求書を更新
- **複数店舗集約**: `updateMultiStoreInvoice()` - 複数店舗の請求データを集約

## 必要な環境

- Google Workspace（Google Apps Script）
- Google スプレッドシート

## ファイル構成

